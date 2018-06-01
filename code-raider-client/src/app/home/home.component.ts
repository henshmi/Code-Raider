import { Component, OnInit } from '@angular/core';
import { CodeBaseModel } from '../models/code-base-model.model';
import { CodebaseService } from '../services/codebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  codebases;

  constructor(private codebaseService: CodebaseService) {
    codebaseService.getAll()
    .subscribe(data => {
      this.codebases = data;
    });
  }

  ngOnInit() {
  }

}
