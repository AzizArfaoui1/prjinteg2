import { ActivatedRoute, Router } from "@angular/router";
import { ReservationserviceService } from "../services/reservationservice.service";
import { ProviderserviceService } from "../services/providerservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  provider!: string;
  user!: string;
  service!: string;
  reservation: any = {
    date: '',
    status: 'PENDING' // Default status
  };

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationserviceService,
    private providerService: ProviderserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.user = params['userId'];
      this.provider = params['providerId'];
      this.service = params['serviceId'];

      if (!this.user || !this.service) {
        console.error('User ID or Service ID is missing');
      } else {
        console.log('Reservation initialized with:', {
          userId: this.user,
          providerId: this.provider,
          serviceId: this.service,
        });

        // Set today's date in the format YYYY-MM-DD
        const today = new Date();
        this.reservation.date = today.toISOString().split('T')[0];
      }
    });
  }

  submitReservation() {
    if (!this.user || !this.service) {
      console.error('User ID or Service ID is missing');
      return;
    }

    const reservationData = {
      user: this.user,
      provider: this.provider,
      service: this.service,
      date: this.reservation.date,
      status: this.reservation.status,
    };

    this.reservationService.createReservation(reservationData).subscribe(
      (response) => {
        console.log('Reservation created successfully', response);
        this.router.navigate(['/userDashboard']); // Redirect on success
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
  }

  cancelReservation() {
    this.router.navigate(['/userDashboard']); // Navigate back to the dashboard or desired route
  }
}
