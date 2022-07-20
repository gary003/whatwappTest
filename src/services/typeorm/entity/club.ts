import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  clubId: string

  @Column("int")
  maxUserNum: number
}
