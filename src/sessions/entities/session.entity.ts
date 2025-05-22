import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;
}
