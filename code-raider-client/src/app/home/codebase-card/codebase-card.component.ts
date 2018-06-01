import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeBaseModel } from '../../models/code-base-model.model';
import { AuthService } from '../../services/auth.service';
import { CodebaseService } from '../../services/codebase.service';

@Component({
  selector: 'codebase-card',
  templateUrl: './codebase-card.component.html',
  styleUrls: ['./codebase-card.component.css']
})
export class CodeBaseCardComponent implements OnInit {

  @Input('code-base-model') codeBaseModel: CodeBaseModel;
  @Output('deleted') deleted: EventEmitter<string> = new EventEmitter();
  @Output('ordered') ordered: EventEmitter<string> = new EventEmitter();

  constructor(
    private auth: AuthService,
  ) {
    this.codeBaseModel = new CodeBaseModel('', '', 0, [], '');
  }

  ngOnInit() {
  }

  order() {
    const id = this.codeBaseModel._id;
    this.ordered.emit(id);
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const id = this.codeBaseModel._id;
      this.deleted.emit(id);
    }
  }
}
