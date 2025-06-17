import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enums/role.enum";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    cpf: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
    
    @Column({ type: 'text', default: Role.USER })
    role: Role;

    @Column({ name: 'profile_icon_url', nullable: true })
    profileIconUrl?: string;
}