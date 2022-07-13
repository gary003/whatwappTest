import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Wallets } from "./wallets"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string

  @OneToOne((type) => Wallets, {
    onDelete: "CASCADE",
  })
  walletId: string
}
