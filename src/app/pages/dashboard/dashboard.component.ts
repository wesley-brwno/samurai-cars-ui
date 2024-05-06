import { Component, OnInit } from '@angular/core';
import { ContactMessage, contactMessagePage } from 'src/app/model/ContactMessagePage';
import { AuthService, LoggedUser } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showVehicles: boolean = true;
  loggedUser!: LoggedUser | null;
  messagesPage!: contactMessagePage;
  selectedMessage!: ContactMessage;

  constructor(private authService: AuthService, private messagesService: MessageService) {}
  
  ngOnInit(): void {
    this.loggedUser = this.authService.getCurrentUser();
    this.getContactMessages();
  }

  isUserAdmin(): boolean {
    return this.loggedUser?.roles.includes("ADMIN", 0) ? true : false;
  }

  getContactMessages() {
    this.messagesService.getContactMessage("?page=0&size=10").subscribe({
      next: (response) => {
        this.messagesPage = response;        
      },
      error: (error) => {
        alert("Fail to retrieve messages " + error)
      } 
    })
  }

  onSelectMessage(message: ContactMessage) {
    this.selectedMessage = message;
    this.showMessageModal();
  }

  showMessageModal() {
    const modal = document.getElementById("message-modal") as HTMLDialogElement;
    modal.showModal();
  }
}
