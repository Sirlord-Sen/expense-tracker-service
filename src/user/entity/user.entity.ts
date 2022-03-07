import { Expense } from 'src/expense/entity/expense.entity';
import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn,
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    Unique, 
    OneToMany
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

    @OneToMany(() => Expense, expenses => expenses.user)
    expenses: Expense[] 

    @Column('text', { nullable: true })
    confirmTokenPassword?: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
