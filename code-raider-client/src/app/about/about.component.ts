import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  addresses = [];
  lat;
  lng;

  constructor(private addressService: AddressService) {
    this.addressService.getAll()
    .subscribe((response: any) => {
        if (response.length > 0) {
          this.lat = response[0].latitude;
          this.lng = response[0].longtitude;
          this.addresses = response;
        }
    });
  }

  ngOnInit() {
  }
}
