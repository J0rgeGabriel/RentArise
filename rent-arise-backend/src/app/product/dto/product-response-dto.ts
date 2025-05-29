export class ProductResponseDto {

    name: string;

    description: string;

    mainPhoto?: string;

    listPhotos?: string[];

    user: {
        id: string;
        username: string;
        role: string;
    };
}