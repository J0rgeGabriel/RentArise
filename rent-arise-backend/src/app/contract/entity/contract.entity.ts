import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enums/status.enum";
import { UserEntity } from "src/app/user/entity/user.entity";
import { ProductEntity } from "src/app/product/entity/product.entity";

@Entity({ name: 'contracts'})
export class ContractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', default: Status.PENDING })
    status: Status;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @ManyToOne(() => ProductEntity, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
    
    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tenant_id' })
    tenant: UserEntity;
    
    @Column({ type: 'datetime', name: 'start_date' })
    startDate: Date;

    @Column({ type: 'datetime', name: 'end_date' })
    endDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}