import { Component, OnInit } from '@angular/core';
import { Provider } from '../models/provider.model';
import { ProviderserviceService } from '../services/providerservice.service';
import { LocationService } from '../services/location-service.service';
import { Service } from '../models/service.model';
import { ServiceService } from '../services/service.service';
import { ReservationserviceService } from '../services/reservationservice.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  provider: any; // Holds user data
  isEditing = false; // Track edit state
  updatedProvider: any = {}; // Initialize updatedUser
  location: any; // Store location details
  isUpdatingService: boolean = false; // Initially false
  reservations: any[] = [];  // List to store reservations

  newService: Service = {
    serviceName: '',
    description: '',
    price: 0,
    date: new Date().toISOString(),
    duree: '',
    provider: '' // Will be set dynamically
  };
  updatedService: Service  = {
    serviceName: '', description: '', price: 0, duree: '', provider: '',
    date: new Date().toISOString()
  };
  cancelServiceUpdate() {
    this.updatedService = {
      serviceName: '', 
      description: '', 
      price: 0, 
      duree: '', 
      provider: '', 
      date: new Date().toISOString()
    };
    this.isUpdatingService = false; // Return to services list
  }
  

  services: Service[] = []; // List of services for the provider
  errorMessage: string | null = null; // Store error messages

  constructor(
    private locationService: LocationService,
    private providerService: ProviderserviceService,
    private serviceService: ServiceService,
    private reservationService: ReservationserviceService
  ) {}

  ngOnInit() {
    this.provider = this.providerService.getProviderInfo();
    console.log('Provider in ngOnInit:', this.provider);

    if (this.provider && this.provider.id) {
      this.updatedProvider = { ...this.provider };
      this.newService.provider = this.provider.id; // Assign provider ID to the new service

      if (this.provider.location && this.provider.location._id) {
        this.fetchLocation();
      }

      // Fetch services for this provider
      this.loadServices();
      this.loadReservations();
    }
  }

  fetchLocation() {
    const locationId = this.provider.location._id; // Assuming location is an object with _id
    if (locationId) {
      this.locationService.getLocationById(locationId).subscribe(
        (locationData) => {
          this.location = locationData;
          this.updatedProvider.location = locationData;
        },
        (error) => {
          console.error('Error fetching location data:', error);
        }
      );
    }
  }

  loadServices() {
    this.serviceService.getServicesByProvider(this.provider.id).subscribe(
      (data) => {
        this.services = data; // Assign fetched services to the list
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.errorMessage = 'Failed to load services. Please try again later.';
      }
    );
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    console.log('Updated provider before API call:', this.updatedProvider);

    // Ensure updatedUser has a valid ID before proceeding
    if (!this.updatedProvider.id) {
      console.error('provider ID is missing');
      return; // Exit if no valid user ID
    }

    console.log('Updated provider ID:', this.updatedProvider.id);  // Debugging: Log the user ID before updating

    // Ensure the location is updated if changed
    if (this.location) {
      this.updatedProvider.location = this.location._id || this.updatedProvider.location;  
    }

    // Update the selected provider if it's set
   

    console.log('Updated User data before update:', this.updatedProvider);

    this.providerService.updateProviderInfo(this.updatedProvider).subscribe(
      (response) => {
        console.log('provider updated successfully:', response);

        // Update the user object with the latest data from the backend
        this.provider = response;  // Replace current user data with updated data from the backend
        this.updatedProvider = { ...this.provider };  // Ensure updatedUser reflects the latest changes

        // Refresh the location data if necessary
        if (this.provider.location && this.provider.location._id) {
          this.fetchLocation();  // Update location if needed
        }

        this.isEditing = false;  // Stop editing mode
      },
      (error) => {
        console.error('Failed to update user:', error);
      }
    );
    if (!this.updatedService._id) {
      console.error('Cannot update service: Service ID is undefined');
      return; // Exit if _id is not set
    }
  
    this.serviceService.updateService(this.updatedService).subscribe(
      (response) => {
        console.log('Service updated successfully:', response);
        // Find and update the service in the list by ID
        const index = this.services.findIndex(s => s._id === response._id);
        if (index !== -1) {
          this.services[index] = response; // Update the service in the list
        }
        this.cancelServiceUpdate(); // Reset form
        this.isUpdatingService = false; // Switch back to list view
      },
      (error) => {
        console.error('Failed to update service:', error);
      }
    );
  }

  cancelEditing() {
    this.isEditing = false;
    this.updatedProvider = { ...this.provider }; // Reset to original data
  }

  addService() {
    if (!this.newService.serviceName || !this.newService.description ||
        !this.newService.price || !this.newService.duree || 
        !this.newService.provider) {
      console.error('Please fill out all fields');
      return;
    }

    this.serviceService.addService(this.newService).subscribe(
      (response) => {
        console.log('Service added successfully:', response);
        this.services.push(response); // Add the new service to the list

        this.loadServices()
      
      },
      (error) => {
        console.error('Error adding service:', error);
      }
    );
    
  }
  enableUpdate(service: Service) {
    if (!service._id) {
      console.error('Service ID is missing:', service);
      return;
    }
    this.isUpdatingService = true; // Switch to update form view
    this.updatedService = { ...service }; // Copy the service data, including the id
  }

  saveUpdatedService() {
    if (!this.updatedService._id) {
      console.error('Cannot update service: Service ID is undefined');
      return; // Exit if _id is not set
    }
  
    this.serviceService.updateService(this.updatedService).subscribe(
      (response) => {
        console.log('Service updated successfully:', response);
        const index = this.services.findIndex(s => s._id === response._id);
        if (index !== -1) {
          this.services[index] = response; // Update the service in the list
        }
        this.cancelServiceUpdate(); // Reset form
        this.isUpdatingService = false; // Switch back to list view
      },
      (error) => {
        console.error('Failed to update service:', error);
      }
    );
  }
  

  deleteService(service: Service) {
    if (service._id && confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(service._id).subscribe(
        () => {
          console.log('Service deleted successfully');
          this.services = this.services.filter(s => s._id !== service._id);
        },
        (error) => {
          console.error('Failed to delete service:', error);
        }
      );
    } else {
      console.error('Service _id is missing');
    }
  }
  loadReservations() {
    console.log('Provider ID:', this.provider.id);
    this.reservationService.getReservationsByProvider(this.provider.id).subscribe(
      (data) => {
        console.log('Fetched reservations:', data);
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        this.errorMessage = 'Failed to load reservations. Please try again later.';
      }
    );
  }
  confirmReservation(reservationId: string) {
    console.log('Reservation ID:', reservationId); // Debug
    this.reservationService.updateReservationStatus(reservationId, 'CONFIRMED')
      .subscribe({
        next: updatedReservation => {
          console.log('Updated Reservation:', updatedReservation); // Debug
          // Update UI
        },
        error: err => {
          console.error('Error:', err); // Debug
        }
      });
      this.loadReservations();
  }
  
  cancelReservation(reservationId: string) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationService.deleteReservation(reservationId)
        .subscribe({
          next: () => {
            // Remove the deleted reservation from the list
            this.reservations = this.reservations.filter(r => r._id !== reservationId);
            alert('Reservation cancelled successfully.');
          },
          error: err => {
            console.error('Failed to cancel reservation:', err);
            alert('Failed to cancel reservation.');
          }
        });
    }
  }
  
}