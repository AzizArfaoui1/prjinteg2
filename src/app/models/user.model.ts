import { Service } from "./service.model";

export interface User {
  id?: string; 
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string;
  adress: string;
  services?: Service[]; 
}

