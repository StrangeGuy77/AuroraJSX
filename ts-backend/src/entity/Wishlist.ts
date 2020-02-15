import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("wishlist")
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 55,
    name: "test_column"
  })
  testColumn: string;
}
