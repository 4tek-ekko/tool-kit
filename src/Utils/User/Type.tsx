export interface UserResponse {
  id: string;
  data: any;
  isError: boolean;
  error: UserError;
}

export interface UserError {
  id: string;
  error: string;
}

export interface UserRequest {
  id: string;
  data: any;
}

export interface PramsSupper {
  data: string;
}
