export interface Invitation {
  hash: string;
  userId: number | null;
  organization: InvitationOrganization;
}

interface InvitationOrganization {
  name: string;
  id: number;
}
