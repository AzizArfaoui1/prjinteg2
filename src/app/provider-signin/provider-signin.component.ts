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

  constructor(
    private providerService: ProviderserviceService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Please fill out all fields before submitting');
      return;
    }
    console.log('Submitting login request:', { username: this.username, password: this.password });

    // Call the login method and subscribe to the response
    this.providerService.loginProvider(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.providerService.setProviderInfo(response); // Store user data
        
        this.router.navigate(['/providerDashboard']); // Redirect to the dashboard on successful login
      },
      error: (error: any) => {
        console.error('Error during login:', error);
        alert('Invalid username or password.');
      }
    });
  }
}

