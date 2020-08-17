import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.css']
})
export class MdEditorComponent implements OnInit {
  public markdownText: FormControl = new FormControl(null, Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

}
