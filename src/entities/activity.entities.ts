import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Index, VersionColumn } from 'typeorm';
import { Lesson } from './lesson.entities';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level_id: string;

  @Column()
  lesson_id: string;

  @Column('jsonb')
  lessons: Question[];

  @ManyToOne(() => Lesson, lesson => lesson.activities)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}