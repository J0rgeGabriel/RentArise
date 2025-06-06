export class ProductResponseDto {

    name: string;

    description: string;

    pricePerDay: number;
    
    mainPhoto?: string;

    listPhotos?: string[];

    user: {
        id: string;
        username: string;
        role: string;
    };
}