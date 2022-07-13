import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity()
export class Wallets {
  @PrimaryGeneratedColumn()
  walletId: string

  @ManyToOne((type) => User)
  @JoinColumn({ name: "userId" })
  userId: string

  @Column("int")
  hard_currency: number

  @Column("int")
  soft_currency: number
}
