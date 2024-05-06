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
    console.log(message);
    
  }

  showModal() {
    const modal = document.getElementById("message-modal") as HTMLDialogElement;
    modal.showModal();
  }


}
