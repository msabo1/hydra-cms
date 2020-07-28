import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(
    private readonly errorsService: ErrorsService,
    private readonly snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.errorsService.error.subscribe((error) => this.openSnackBar(error.message));
  }

  openSnackBar(message: string){
    this.snackBar.open(message, null, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
