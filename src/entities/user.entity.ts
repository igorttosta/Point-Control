import { randomUUID } from 'node:crypto';
import { Hour } from './hour.entity';
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    cpf: string

    @Column()
    password: string

    @OneToOne(() => Hour, hour => hour.user, { cascade: true })
    hour: Hour;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @BeforeInsert()
    generetadId() {
        if(this.id) {
            return
        }

        this.id = randomUUID()
    }
}