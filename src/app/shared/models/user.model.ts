export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  age: number | null;
  image: string | null;
}

export interface UserResponse {
  data: User;
  meta: unknown;
}

export interface ProfileResponse {
  data: User;
  meta: unknown;
}

export interface EditUserRequest {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  age: number | null;
  image: string | null;
}