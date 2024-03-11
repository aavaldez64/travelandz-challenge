export interface LoginUserProps {
  username: string;
  password: string;
}
export interface LoginUserResponse {
  user: User;
  token: string;
}
export interface User {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface RegisterUserProps {
  name: string;
  lastName: string;
  phone: string; // +11234567890
  username: string;
  email: string;
  password: string;
}
