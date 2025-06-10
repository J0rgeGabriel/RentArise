export interface Produto {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  mainPhoto: string;
  listPhotos: string[] | null;
  createdAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  cpf: string;
  createdAt: Date;
  deletedAt: string | null;
  role: UserRole;
}

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}

export interface ProfileIcon {
  id: number;
  url: string;
}