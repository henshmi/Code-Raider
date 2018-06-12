import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output('signedOut') signedOut = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signout() {
    this.auth.signOut();
    this.signedOut.emit();
  }

}
