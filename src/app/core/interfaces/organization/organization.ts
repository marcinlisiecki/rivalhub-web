export interface Organization {
  id: number;
  name: string;
  colorForDefaultImage: string;
  invitationHash: string;
  imageUrl: string | null;
}
