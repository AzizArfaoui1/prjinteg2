export interface Reservation {
    providerId?: string;
    serviceId: string;
    userId: string;
    date: Date;
    status: string; 
  }