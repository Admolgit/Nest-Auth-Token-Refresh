import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Index, VersionColumn } from 'typeorm';
import { Level } from './level.entities';
import { Activity } from './activity.entities';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  lessonNumber: number;

  @Column()
  exerciseCount: number;

  @Column()
  goal: string;

  @Column('simple-array')
  points: string[];

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => Level, level => level.lessons)
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @Column({ nullable: false })
  @Index()
  level_id: string;

  @OneToMany(() => Activity, activity => activity.lesson)
  activities: Activity[];
}