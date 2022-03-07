import { Balance } from 'src/expense/entity/balance.entity';
import { Expense } from 'src/expense/entity/expense.entity';
import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    Unique, 
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';

@Entity()
@Unique('Email', ['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    firstname: string

    @Column()
    surname: string

    @Column()
    password: string

    @OneToOne(() => Balance)
    @JoinColumn()
    balance: Balance 

    @Column('text', { nullable: true })
    confirmTokenPassword?: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
