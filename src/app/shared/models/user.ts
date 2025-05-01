export interface User {
    user_id: number;
    username: string;
    email: string;
    role: string;
    associated_id?: number;
    last_login?: string;
  }