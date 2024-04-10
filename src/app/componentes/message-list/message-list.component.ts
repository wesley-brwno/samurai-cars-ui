import { Component, Input, OnInit } from '@angular/core';
import { ContactMessage, contactMessagePage } from 'src/app/model/ContactMessagePage';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {


  contactMessagePage!: contactMessagePage;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages("?page=0&size=10");
  }

  getMessages(pageable: string) {
    this.messageService.getContactMessage(pageable).subscribe({
      next: (response) => {
        this.contactMessagePage = response;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
