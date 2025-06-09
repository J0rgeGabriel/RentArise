export interface Product {
  id: number;
  name: string;
  description: string;
  mainPhoto?: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}
