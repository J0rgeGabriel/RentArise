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
  userId: string;
  fullname: string;
  username: string;
  email: string;
  cpf: string;
  createdAt: Date;
  deletedAt: string | null;
  profileIconUrl?: string;
  role: UserRole;
}

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}

export interface UpdateUserDto {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  profileIconUrl?: string;
}

export interface ProfileIcon {
  id: number;
  url: string;
}

export interface Profile {
  id: string;
  fullname: string;
  username: string;
  email: string;
  createdAt: Date;
  role: string;
  profileIconUrl?: string;
}

export interface ContractsStats {
  totalContracts: number;
  activeContracts: number;
  totalPaid: number;
}

export interface FullStatistics {
  profile: Profile;
  contracts: ContractsStats;
  products: {
    total: number;
  };
  receivables: {
    totalReceivables: number;
  };
}

export interface FullReports {
  totalUsers: number;
  productsRented: number;
  contractsCompleted: number;
  totalRevenue: number;
}

export interface Contract {
  id?: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'rejected';
  value: number;
  productId: string;
  tenant?: User;
  startDate: Date;
  endDate: Date;
  createdAt?: Date | null;
  deletedAt?: Date | null;
}

export interface UpdateContractDto {
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'cancelled' | 'rejected';
  value?: number;
  startDate?: Date;
  endDate?: Date;
}