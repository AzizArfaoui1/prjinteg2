import { Component, OnInit } from '@angular/core'; 
import { UserserviceService } from '../services/userservice.service';
import { LocationService } from '../services/location-service.service';
import { ProviderserviceService } from '../services/providerservice.service';
import { Service } from '../models/service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: any; // Holds user data
  isEditing = false; // Track edit state
  updatedUser: any = {};  // Initialize updatedUser
  location: any; // Store location details
  providers: any[] = []; // Store the list of providers
  filteredProviders: any[] = []; // Filtered list based on search
  searchQuery: string = ''; // Search term for job
  selectedProvider: any = null; // Store the selected provider
  serviceName: string = ''; // For binding the search input
  
  constructor(
    private userService: UserserviceService,
    private locationService: LocationService, // Inject LocationService
    private providerService: ProviderserviceService,
    private router: Router // Inject Router

  ) {}

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    console.log('User in ngOnInit:', this.user);

    if (this.user && this.user.id) {
      this.updatedUser = { ...this.user };
      if (this.user.location && this.user.location._id) {
        this.fetchLocation();
      }
    }
    this.loadProviders(); // Load providers on component initialization
    console.log('Providers loaded:', this.providers); // Check providers during initialization

  }

  fetchLocation() {
    const locationId = this.user.location._id;  // Assuming location is an object and _id is the field storing the ID
    console.log('Fetching location for ID:', locationId);  // Ensure locationId is the actual ID string or number
    if (locationId) {
      this.locationService.getLocationById(locationId).subscribe(
        (locationData) => {
          console.log('Location fetched:', locationData);
          this.location = locationData;
          this.updatedUser.location = locationData;  // Ensure updatedUser location is updated
        },
        (error) => {
          console.error('Error fetching location data:', error);
        }
      );
    } else {
      console.error('Invalid location ID:', locationId);
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    console.log('Updated User before API call:', this.updatedUser);

    if (!this.updatedUser.id) {
      console.error('User ID is missing');
      return;
    }

    console.log('Updated User ID:', this.updatedUser.id);

    if (this.location) {
      this.updatedUser.location = this.location._id || this.updatedUser.location;  
    }

    if (this.selectedProvider) {
      this.updatedUser.selectedProvider = this.selectedProvider._id; // Assuming backend expects provider's ID
    }

    console.log('Updated User data before update:', this.updatedUser);

    this.userService.updateUserInfo(this.updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.user = response;
        this.updatedUser = { ...this.user };

        if (this.user.location && this.user.location._id) {
          this.fetchLocation();
        }

        this.isEditing = false;
      },
      (error) => {
        console.error('Failed to update user:', error);
      }
    );
  }

  cancelEditing() {
    this.isEditing = false;
    this.updatedUser = { ...this.user };
  }

  loadProviders(): void {
    this.providerService.getProviders().subscribe({
      next: (data) => {
        this.providers = data;
        this.filteredProviders = data; // Initialize filtered list with all providers
        console.log('Providers loaded:', this.providers);
      },
      error: (err) => console.error('Error loading providers:', err),
    });
  }
  

  filterProvidersByService(serviceName: string) {
    console.log('Original providers:', this.providers); // Check structure before filtering
    if (serviceName.trim() === '') {
      this.filteredProviders = this.providers;
    } else {
      this.filteredProviders = this.providers.filter(provider => 
        provider.services?.some((service: Service) => 
          service.serviceName && service.serviceName.toLowerCase().includes(serviceName.toLowerCase())
        )
      );
    }
    console.log('Filtered providers:', this.filteredProviders); // Check the result of filtering
  }
  
  

  selectProvider(provider: any) {
    console.log('Provider clicked:', provider);  // Log the selected provider
  
    if (this.serviceName && this.serviceName.trim() !== '') {
      // Find the service in the provider's services array that matches the search query
      const selectedService = provider.services?.find((service: Service) => 
        service.serviceName?.toLowerCase().includes(this.serviceName.toLowerCase())
      );
  
      if (selectedService) {
        // If a service is found, store its ID in updatedUser.selectedService
        this.updatedUser.selectedService = selectedService._id;  
        console.log('Selected Service ID:', selectedService._id);
      } else {
        // If no service matches, clear the selectedService
        this.updatedUser.selectedService = null;
        console.log('No matching service found');
      }
    } else {
      console.error('Service name is not defined or empty');
    }
  
    // Store the provider ID in updatedUser.selectedProvider
    this.selectedProvider = provider;
    this.updatedUser.selectedProvider = provider._id;  // Store provider ID
    console.log('Selected Provider ID:', provider._id);
  }
  
  
  
  

  isProviderSelected(provider: any): boolean {
    return this.selectedProvider && this.selectedProvider._id === provider._id;
  }

  onSearch(): void {
    if (!this.serviceName.trim()) {
      alert('Please enter a service name to search.');
      return;
    }

    this.providerService.filterProvidersByService(this.serviceName).subscribe({
      next: (data) => {
        this.providers = data;
      },
      error: (err) => {
        console.error('Error fetching providers:', err);
        alert('An error occurred while fetching providers.');
      }
    });
  }
  navigateToReservation() {
    const providerId = this.updatedUser.selectedProvider;
    const serviceId = this.updatedUser.selectedProvider;
    const userId = this.user?.id;
  
    console.log('Navigating to Reservation...');
    console.log('Provider ID:', providerId || 'Missing');
    console.log('Service ID:', serviceId || 'Missing');
    console.log('User ID:', userId || 'Missing');
  
    if (!providerId) {
      console.error('Provider ID is missing');
    }
    if (!serviceId) {
      console.error('Service ID is missing');
    }
    if (!userId) {
      console.error('User ID is missing');
    }
  
    if (providerId && serviceId && userId) {
      this.router.navigate(['/reservation'], { queryParams: { providerId, serviceId, userId } });
    } else {
      alert('Cannot navigate due to missing parameters');
    }
  }
  
  
}