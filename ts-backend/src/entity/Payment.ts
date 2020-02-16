import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity("payment")
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    array: true,
    name: "payment_method"
  })
  paymentMethod: [string];

  @Column("varchar", {
    length: 3
  })
  currency: string;

  @Column("integer", {
    name: "amount"
  })
  amount: number;

  @Column("varchar", {
    length: 55
  })
  name: string;

  @Column("varchar", {
    length: 55,
    name: "description"
  })
  description: string;

  @OneToOne(_ => User)
  @JoinColumn()
  user: User;
}
