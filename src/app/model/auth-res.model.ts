
export interface AuthResModel {
  jwt: string;
  userDetails: UserDetails;
}

export interface UserDetails {
  userId: number;
  fullname: string;
  contactNumber: string;
  emailId: string;
  password: string;
  userRole: string;
}