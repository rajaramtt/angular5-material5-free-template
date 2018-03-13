
export interface Users {
  users: UsersData[];
  total_count: number;
}
export interface UsersData {
  name: string;
  email: number;
  mobile: number;
  status: string;
  actions: string;
}
