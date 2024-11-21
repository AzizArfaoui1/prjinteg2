import { Component } from '@angular/core';
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent {
  constructor(private userService: ProviderserviceService) {}

  formattedDate: string = '';
  provider: Provider | null = null;

  theuser: Provider | null = null;
  isEditing: boolean = false; // Tracks if the form is in edit mode
  updatedUser: Provider | null = null;
  ngOnInit(): void {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', // Correct type
      month: 'long',   // Correct type
      day: 'numeric',  // Correct type

      
    };
    this.formattedDate = today.toLocaleDateString(undefined, options);


    this.provider = this.userService.getProviderInfo(); 
    this.provider = this.userService.getProviderInfo(); // Load user data from service
    if (!this.provider) {
      // If user data isn't available, fetch from API (adjust ID as needed)
      this.userService.getProviderById(1).subscribe({
        next: data => (this.provider = data),
        error: () => console.error('Error fetching user data')
      });
    }
  }

  
  enableEditing(): void {
    this.isEditing = true;
    this.updatedUser = { ...this.provider } as Provider;
  }
  
    
  
}
