import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css',
})
export class ModalWindowComponent {
  selectedCity!: string;
  startDate!: string;
  endDate!: string;

  @Output() tripAdded = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalWindowComponent>
  ) {}

  addTrip() {
    const newTrip = {
      destination: this.selectedCity,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.tripAdded.emit(newTrip);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
