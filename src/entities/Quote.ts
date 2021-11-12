import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("quotes")
@ObjectType()
export class QuoteEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text", {nullable: true})
  quote: string;

  @Field(() => String)
  @Column("text", {nullable: true})
  imageUri: string;
}
