export interface User {
  id?: number; 
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string;
  adress: string;
  comments: boolean;
  candidates: boolean;
  offers: boolean;
}
