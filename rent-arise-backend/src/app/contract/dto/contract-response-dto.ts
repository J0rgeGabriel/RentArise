import { Status } from "../enums/status.enum";

export class ContractResponseDto {
    id: string;

    description: string;

    status: Status;
    
    value: number;
    
    startDate: Date;

    endDate: Date;

    createdAt: Date;
    
    deletedAt?: Date;
    
    tenant: {
        id: string;
        username: string;
        role: string;
    };

    product: {
        id: string;
        name: string;
        description: string;
        mainPhoto?: string;
        user: {
            id: string;
            username: string;
        }
    }
}