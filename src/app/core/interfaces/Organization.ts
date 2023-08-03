export interface Organization {
  id: number;
  name: string;
  imageUrl: string | null;
}

export interface NewOrganization {
  name: string;
  imageUrl?: string;
}
