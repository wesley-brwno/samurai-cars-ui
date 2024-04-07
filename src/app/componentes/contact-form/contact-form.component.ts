import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleData } from 'src/app/model/vehiclePage';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Output() onCloseModalEmmiter: EventEmitter<void> = new EventEmitter();
  @Input() vehicle!: VehicleData;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.contactForm  = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      lastname:['', [Validators.required, Validators.minLength(2)]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      message:['', [Validators.required, Validators.minLength(10)]]
    })
  }

  onCloseForm() {
    this.contactForm.reset();
    this.onCloseModalEmmiter.emit();
  }

  onFormSubmit() {
    if(this.contactForm.valid) {
      this.messageService.postContactMessage({
        vehicle_id: this.vehicle.vehicle.id,
        ...this.contactForm.value
      }).subscribe({
        next: (response) => {
          this.contactForm.reset(),
          alert("Your message was sent");
        },
        error: (error) => {
          alert("Fail to sent your message");
        },
        complete: () => {}   
      })
    }    
  }
}
