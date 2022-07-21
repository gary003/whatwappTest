import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  clubId: string
}
