import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
    selector: "app-test-page",
    templateUrl: "./test-page.page.html",
    styleUrls: ["./test-page.page.scss"],
})
export class TestPagePage implements OnInit {
    constructor(private db: AngularFirestore) {}

    ngOnInit() {}

    insertDocument() {
        this.db
            .collection("sampleCollection")
            .add({ name: "sampleName", contact: 123 })
            .then((ref) => {
                console.log("Added document with ID: ", ref.id);
            });
    }
}
