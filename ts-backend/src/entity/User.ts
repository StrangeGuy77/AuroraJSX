import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 55
  })
  email: string;

  @Column("text")
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("date", {
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: string;

  @Column("integer", {
    default: 0,
    name: "user_role"
  })
  userRole: string;

  @Column("varchar", {
    length: 50,
    name: "profile_pic"
  })
  profilePic: string;

  @Column("varchar", {
    length: 55
  })
  name: string;

  @Column("varchar", {
    length: 55
  })
  lastname: string;

  @Column("varchar", {
    length: 55
  })
  cellphone: string;

  @Column("varchar", {
    length: 55
  })
  worksite: string;

  @Column("varchar", {
    length: 55
  })
  company: string;

  @Column("varchar", {
    length: 10
  })
  country: string;

  @Column("varchar", {
    length: 55
  })
  github: string;

  @Column("varchar", {
    length: 55
  })
  webpage: string;

  @Column("boolean", {
    name: "show_public_name",
    default: false
  })
  showPublicName: string;

  @Column("boolean", {
    name: "show_public_email",
    default: false
  })
  showPublicEmail: string;

  @Column("boolean", {
    name: "show_public_location",
    default: false
  })
  showPublicLocation: string;

  @Column("integer", {
    default: 0
  })
  followers: number;

  @Column("integer", {
    default: 0,
    name: "times_liked"
  })
  timesLiked: number;

  @Column("integer", {
    default: 0,
    name: "times_posted"
  })
  timesPosted: number;
}
