import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  messageId: string

  @Column("text")
  senderId: string

  @Column("text")
  clubId: string

  @Column("text")
  content: string
}
