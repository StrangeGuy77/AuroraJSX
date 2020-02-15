import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("courses")
export class Courses extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 55,
    name: "test_column"
  })
  testColumn: string;
}
