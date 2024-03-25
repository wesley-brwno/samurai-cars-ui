import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() vehicleName!: string;
  @Output() comfirmDelete: EventEmitter<void> = new EventEmitter();

  closeDeleteModal() {
    const modal = document.getElementById("confirm_delete") as HTMLDialogElement;    
    modal.close();
  }

  onConfirmDeleteClick() {
    this.comfirmDelete.emit();
  }
}
