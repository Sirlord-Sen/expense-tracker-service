import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn,
    UpdateDateColumn 
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstname: string

    @Column()
    surname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column('text', { nullable: true })
    confirmTokenPassword?: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
