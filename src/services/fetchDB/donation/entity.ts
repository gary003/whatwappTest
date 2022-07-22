import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  donationId: string

  @Column("text")
  recipientId: string

  @Column("int")
  fundingGoal: number

  @Column("int")
  currentFund: number
}
