export interface Invitation {
  hash: string;
  organization: InvitationOrganization;
}

interface InvitationOrganization {
  name: string;
  id: number;
}
