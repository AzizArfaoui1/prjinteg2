import { Service } from "src/app/models/service.model";

export interface UserProfile {
    username?:string;
    email?:string;
    firstname?:string;
    lastname?:string;
    location?: string;
    adress?: string;
    token?: string;
      services?: Service[]; 
    
}