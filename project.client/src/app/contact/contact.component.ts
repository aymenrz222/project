import { Component } from '@angular/core';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {



  senderName: string = "";
  recipientEmail: string = "";
  subject: string = "";
  replyToEmail: string = "";
  message: string = "";
  successMessage: string = ""; // Add success message variable
  requiredFieldsMessage: string = ""; // Message for indicating required fields
  errorMessage: string = ""; // Add error message variable

  constructor() {
    emailjs.init("ntsL0qOZbSDnJIDmc"); // Initialize EmailJS
  }

  sendMail(form: any) {
    this.requiredFieldsMessage = ""; // Reset the required fields message
    if (form.valid) {
      const templateParams = {
        senderName: this.senderName,
        replyToEmail: this.replyToEmail,
        to: this.recipientEmail,
        subject: this.subject,
        message: this.message
      };
  
      emailjs.send('service_grglsbb', 'template_xnoaihc', templateParams)
        .then((response) => {
          console.log('Email sent successfully:', response);
          this.successMessage = 'E-mail envoyé avec succès'; // Set success message
          this.errorMessage = ''; // Clear any previous error message
          // Additional logic after successful email sending can be added here
        }, (error) => {
          console.error('Error sending email:', error);
          this.errorMessage = 'Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.'; // Set error message
          this.successMessage = ''; // Clear any previous success message
          // Additional error handling logic can be added here
        });
    } else {
      this.requiredFieldsMessage = "Veuillez remplir tous les champs nécessaires pour envoyer l'e-mail."; // Set the required fields message
    }
  }
}