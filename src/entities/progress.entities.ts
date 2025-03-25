import { Entity, PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  completedLessons: number;

  @Column('simple-json')
  completedItems: string[]; 

  @VersionColumn()
  version: number;
}