import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { User } from './user.entity';
import { randomUUID } from 'node:crypto';

@Entity('hours')
@Unique(['user', 'relevant_day'])
export class Hour {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'date' })
    relevant_day: Date

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    started_at: Date | null;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    paused_at: Date | null;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    returned_at: Date | null;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    ended_at: Date | null;

    @Column({ type: 'varchar', nullable: true })
    totalHours: string | null;

    @OneToOne(() => User, user => user.hour, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @BeforeInsert()
    generetadId() {
        if(this.id) {
            return
        }

        this.id = randomUUID()
    }
}