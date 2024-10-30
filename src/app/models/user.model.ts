export interface User {
  username: string;
  image?:File;
  firstname: string;
  lastname: string;
  email: string;
  location: string;
  comments: boolean;
  candidates: boolean;
  offers: boolean;
}
