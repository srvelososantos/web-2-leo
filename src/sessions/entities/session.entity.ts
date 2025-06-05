import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  lecture: boolean;

  @Column()
  course_max_cap: number;

  // Cada sessão pertence a um único evento
  @ManyToOne(() => Event, event => event.sessions, { onDelete: 'CASCADE' })
  eventt: Event;

  @ManyToMany(() => User, user => user.sessionn, { onDelete: 'CASCADE' })
  user: User[];


}
