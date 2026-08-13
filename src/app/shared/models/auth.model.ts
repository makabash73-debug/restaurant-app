export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    isVerified: boolean;
  };
  meta: unknown;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface VerifyEmailResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    isVerified: boolean;
  };
  meta: unknown;
}