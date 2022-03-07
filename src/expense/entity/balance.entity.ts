import { 
    Entity, 
    BaseEntity,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column,
    OneToMany
} from 'typeorm'
import { Expense } from './expense.entity'

@Entity("balance")
export class Balance extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: 1000})
    total: number

    @Column()
    balance: number

    @OneToMany(() => Expense, expenses => expenses.balance)
    expenses: Expense[] 

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_At: Date
}