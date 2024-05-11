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
}
