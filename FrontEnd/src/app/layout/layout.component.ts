import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {

  user: User = new User();

  constructor(private userService:UserService) {

    this.user = userService.getUser();
  }

  ngOnInit(): void {}
}
