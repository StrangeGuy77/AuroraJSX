import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity("books")
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 50
  })
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", {
    length: 30
  })
  author: string;

  @Column("float")
  price: number;

  @Column("varchar", {
    length: 5
  })
  extension: string;

  @Column("varchar", {
    length: 50
  })
  publisher: string;

  @Column("integer")
  publisherYear: number;

  @Column("integer")
  writingYear: number;

  @Column("varchar", {
    array: true
  })
  categories: [string];

  @Column("varchar", {
    length: 50
  })
  filename: string;

  @Column("integer")
  views: number;

  @Column("integer")
  likes: number;

  @Column("integer")
  timesDownloaded: number;

  @OneToOne(_ => User)
  @JoinColumn()
  user: User;
}
