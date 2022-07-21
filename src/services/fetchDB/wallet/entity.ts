import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  walletId: string

  @Column("int")
  hard_currency: number

  @Column("int")
  soft_currency: number
}
