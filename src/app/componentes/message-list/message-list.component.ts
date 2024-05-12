import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactMessage, contactMessagePage } from 'src/app/model/ContactMessagePage';
import { Vehicle, VehicleData } from 'src/app/model/vehiclePage';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input("messagesPage") contactMessagePage!: contactMessagePage;
  @Output() messageEmmiter: EventEmitter<ContactMessage> = new EventEmitter<ContactMessage>();
  vehicle!: VehicleData;
  messageToDelete!: ContactMessage;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
  }

  onSelectMessage(message: ContactMessage) {
    this.messageEmmiter.emit(message);
    this.markMessageAsRead(parseInt(message.id));
  }

  onDeleteMessage(message: ContactMessage) {
    const modal = document.getElementById("delete-modal") as HTMLDialogElement;
    modal.showModal();
    this.messageToDelete = message;
  }

  onComfirmDelete() {    
    this.messageService.deleteMessage(this.messageToDelete.id).subscribe({
      next: (reponse) => {
        alert(`${this.messageToDelete.name}'s message was successfuly deleted!`);
        this.removeMessageFromPageable();
      },
      error: (error) => {
        alert("Fail to delete message!")
      },
      complete: () => {
        this.closeDelteModal();
      }
    })
  }

  markMessageAsRead(messageId: number) {
    this.messageService.getMessageById(messageId).subscribe({
      next: (response) => {
        this.updateMessagesList(response);
      },
      error: (error) => {
        console.log(error);        
      }
    })
  }

  updateMessagesList(updatedMessage: ContactMessage) {
    const msgIndex = this.contactMessagePage.content.map(msg => msg.id).indexOf(updatedMessage.id);
    this.contactMessagePage.content[msgIndex] = updatedMessage;
  }

  showModal() {
    const modal = document.getElementById("message-modal") as HTMLDialogElement;
    modal.showModal();
  }

  closeDelteModal() {    
    const modal = document.getElementById("delete-modal") as HTMLDialogElement;    
    modal.close();
  }


  closeModalByBackdropClick(event: MouseEvent) {
    const modal = document.getElementById("delete-modal") as HTMLDialogElement;    
    const dialogDimensions = modal.getBoundingClientRect();

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      modal.close()
    }
  }

  private removeMessageFromPageable() {
    const messageIndex = this.contactMessagePage.content.indexOf(this.messageToDelete);
    this.contactMessagePage.content.splice(messageIndex, 1);
  }
}
