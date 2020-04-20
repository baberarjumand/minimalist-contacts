import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { LoadingController, AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface Record {
    name: string;
    contact: number;
    id: string;
}

@Component({
    selector: "app-test-page",
    templateUrl: "./test-page.page.html",
    styleUrls: ["./test-page.page.scss"],
})
export class TestPagePage implements OnInit {
    records$;
    records: Record[];

    constructor(
        private db: AngularFirestore,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {}

    ngOnInit() {
        this.records$ = this.getAllRecords().subscribe(
            (records) => (this.records = records)
        );
    }

    convertSnaps<T>(snaps) {
        return <T[]>snaps.map((snap) => {
            return {
                id: snap.payload.doc.id,
                ...(snap.payload.doc.data() as T),
            };
        });
    }

    async insertDocument() {
        // loadingCtrl not necessary as user can browse app while
        //  firebase does its thing in background
        const randomSampleNum = Math.floor(Math.random() * 100).toString();
        const randomContactNum = Math.floor(Math.random() * 10000);
        const loading = await this.loadingCtrl.create({
            message: "Please wait...",
        });
        await loading.present();
        this.db
            .collection("sampleCollection")
            .add({
                name: "sampleName" + randomSampleNum,
                contact: randomContactNum,
            })
            .then((ref) => {
                console.log("Added record with ID: " + ref.id);
                loading.dismiss();
            });
    }

    getAllRecords(): Observable<any> {
        return this.db
            .collection("sampleCollection")
            .snapshotChanges()
            .pipe(map((snaps) => this.convertSnaps<Record>(snaps)));
    }

    findRecordById(recordId: string): Record {
        const r = this.records.filter((record) => record.id === recordId);
        return r.length === 1 ? r[0] : undefined;
    }

    async deleteRecord(recordId: string) {
        const r = this.findRecordById(recordId);
        const alert = await this.alertCtrl.create({
            header: "Confirm Delete?",
            message: `id: ${r.id}<br>name: ${r.name}<br>contact: ${r.contact}`,
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                },
                {
                    text: "Yes",
                    handler: () => {
                        // delete logic
                        this.db
                            .collection("sampleCollection")
                            .doc(recordId)
                            .delete();
                        console.log("Deleted record with ID: " + r.id);
                    },
                },
            ],
        });
        await alert.present();
    }

    async editRecord(recordId: string) {
        const r = this.findRecordById(recordId);
        const alert = await this.alertCtrl.create({
            header: "Edit Record",
            message: `Record ID: ${r.id}`,
            inputs: [
                {
                    name: "name",
                    type: "text",
                    value: `${r.name}`,
                    placeholder: "Enter Record Name",
                },
                {
                    name: "contactNum",
                    type: "number",
                    value: `${r.contact}`,
                    placeholder: "Enter Record Contact Number",
                },
            ],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                },
                {
                    text: "Confirm Changes",
                    handler: (formData) => {
                        // update record logic
                        this.db
                            .collection("sampleCollection")
                            .doc(recordId)
                            .update({
                                name: formData.name,
                                contact: formData.contactNum,
                            });
                        console.log("Updated record with ID: " + r.id);
                    },
                },
            ],
        });
        await alert.present();
    }
}
