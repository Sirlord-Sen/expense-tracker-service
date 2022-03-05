import { User } from 'src/user/entity/user.entity';
import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('timestamptz')
    expiredAt!: Date;

    @Column('boolean', { default: false })
    isRevoked = false;

    @Index()
    @Column('varchar')
    jti!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Index()
    @Column('uuid')
    userId!: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
