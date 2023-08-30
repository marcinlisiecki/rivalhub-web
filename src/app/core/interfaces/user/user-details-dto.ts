export interface UserDetailsDto {
  id: number;
  name: string;
  email: string;
  profilePictureUrl: string;
  activationTime: Date | null;
}
