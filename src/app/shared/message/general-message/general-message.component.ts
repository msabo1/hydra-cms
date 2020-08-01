import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general-message',
  templateUrl: './general-message.component.html',
  styleUrls: ['./general-message.component.css']
})
export class GeneralMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) { }

  ngOnInit(): void {
  }

}
