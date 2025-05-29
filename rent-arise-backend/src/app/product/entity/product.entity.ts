import { UserEntity } from "src/app/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true})
    mainPhoto: string;

    @Column({ type: 'simple-json', nullable: true })
    listPhotos: string[];

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}