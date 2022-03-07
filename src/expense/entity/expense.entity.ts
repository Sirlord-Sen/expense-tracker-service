import { User } from 'src/user/entity/user.entity'
import { 
    Entity, 
    BaseEntity,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column,
    ManyToOne
} from 'typeorm'
import { Category } from '../expense.types'
import { Balance } from './balance.entity'

@Entity("expenses")
export class Expense extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    amount: number

    @Column()
    category: 'food' | 'transportation' | 'clothes' | 'accommodation' | 'entertainment'

    @ManyToOne(() => Balance, balance => balance.expenses)
    balance: Balance

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_At: Date
}