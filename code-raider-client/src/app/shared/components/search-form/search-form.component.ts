import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output('search') search = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submit(filter) {
    filter.tag = filter.tag ? filter.tag : '';
    filter.minprice = filter.minprice ? filter.minprice : '';
    filter.maxprice = filter.maxprice ? filter.maxprice : '';

    this.search.emit(filter);
  }

}
