import { Component } from '@angular/core';
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent {
  provider: Provider= {username: '',
    image: new File([], ""),
    job:'',
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    comments: false,
    candidates: false,
    offers:false
  };
  constructor(private providerService: ProviderserviceService) {}
  onSubmit() {
    this.providerService.addUser(this.provider).subscribe({
      next: response => {
        console.log('User data sent successfully:', response);
        // Optionally reset the form or perform additional actions
        this.provider = { 
          username: '',
          image: new File([], ""),
          job:'',
          firstname: '',
          lastname: '',
          email: '',
          country: '',
          comments: false,
          candidates: false,
          offers: false
        };
      },
      error: error => {
        console.error('Error sending user data:', error);
      }
    });
  }
  triggerFileInputClick(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  // Function to handle file selection
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.provider.image = fileInput.files[0];
    }
  }
}
