import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Index, VersionColumn } from 'typeorm';
import { Lesson } from './lesson.entities';

@Entity()
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  image: string;

  @Column()
  level: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['Igbo', 'Yoruba'] })
  language: 'Igbo' | 'Yoruba';

  @Column()
  completedLessons: number;

  @Column()
  totalLessons: number;

  @OneToMany(() => Lesson, lesson => lesson.level)
  lessons: Lesson[];
}