import { Component, OnInit } from '@angular/core';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any = [];

  constructor(private userService: UserService) {
    this.userService.getAll()
    .subscribe( users => this.users = users);
   }

  ngOnInit() {
  }

  deleteUser(id) {

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.userService
    .delete(id)
    .subscribe(response => {

      let index = -1;

      for (let i = 0 ; i < this.users.length ; i++ ) {
        if (this.users[i]._id === id ) {
          index = i;
          break;
        }
      }

      this.users.splice(index, 1);
    });
  }

}
