import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string

  @Column("text")
  walletId: string
}
