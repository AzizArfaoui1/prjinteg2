import { Component } from '@angular/core';
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-signin',
  templateUrl: './provider-signin.component.html',
  styleUrls: ['./provider-signin.component.css']
})
export class ProviderSigninComponent {
  username = '';
  password = '';
  email = '';

  constructor(private providerService: ProviderserviceService, private router: Router) {}

  onSubmit() {
    this.providerService.loginProvider(this.username, this.password, this.email).subscribe({
      next: response => {
        if (response.success) {
          console.log('Login successful');
          const provider: Provider = {
            username: response.data.username,
            password: '', // You can choose not to store sensitive data
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            job:response.data.job,
            email: response.data.email,
            location: response.data.location,
            comments: response.data.comments,
          };
          // Save user information in a service or localStorage
          this.providerService.setProviderInfo(provider); // Save user info
          this.router.navigate(['/providerDashboard']); // Navigate to dashboard
        } else {
          console.log('Invalid credentials');
        }
      },
      error: () => {
        console.log('Error during login');
      }
    });
  }
  
}
