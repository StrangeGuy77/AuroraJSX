import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity("softwares")
export class Software extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 255
  })
  title: string;

  @Column("text")
  description: string;

  @Column("varchar", {
    array: true
  })
  devLanguages: [string];

  @Column("varchar", {
    array: true
  })
  frameworks: [string];

  @Column("float")
  price: number;

  @Column("varchar", {
    length: 255
  })
  filename: string;

  @Column("integer", {
    default: 0
  })
  views: number;

  @Column("integer", {
    default: 0
  })
  likes: number;

  @Column("integer", {
    default: 0
  })
  timesDownloaded: number;

  @OneToOne(_ => User)
  @JoinColumn()
  user: User;

  @Column("varchar", {
    length: 50
  })
  userUploaderName: string;

  @Column("date", {
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: string;
}
