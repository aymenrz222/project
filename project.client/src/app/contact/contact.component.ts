import { Component } from '@angular/core';
import { EmailService } from './email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private emailService: EmailService) { }

  onSubmit() {
    const templateParams = {
      from_name: this.name,
      from_email: this.email,
      message: this.message,
      to_email: 'hamdiwassim357@gmail.com'
    };

    this.emailService.sendEmail(templateParams).then(
      response => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Email sent successfully!');
      },
      error => {
        console.error('Failed to send email. Error: ', error);
        alert('Failed to send email. Please try again later.');
      }
    );
  }
}
