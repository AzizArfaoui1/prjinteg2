export interface User {
  username: string;
  image?:File;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  comments: boolean;
  candidates: boolean;
  offers: boolean;
}
