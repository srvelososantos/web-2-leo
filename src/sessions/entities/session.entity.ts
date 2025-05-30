import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  // Cada sessão pertence a um único evento
  @ManyToOne(() => Event, event => event.sessions, { onDelete: 'CASCADE' })
  eventt: Event;
}
