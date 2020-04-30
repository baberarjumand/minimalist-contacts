import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.page.html',
  styleUrls: ['./my-settings.page.scss'],
})
export class MySettingsPage implements OnInit {
  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentUser = this.activatedRoute.snapshot.data.userDetails;
  }
}
