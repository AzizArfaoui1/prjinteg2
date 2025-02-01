import { Service } from "./service.model";

export interface Provider {
  id?: string; 
    username: string;
    password: string;
    phone: string;
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    services?: Service[] ; 
  }