export interface Organization {
  id: number;
  name: string;
  imageUrl: string;
}

export interface NewOrganization {
  name: string;
  imageUrl?: string;
}
