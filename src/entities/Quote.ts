import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class QuoteEntity{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    quote: string;

    @Field(() => String)
    imageUri: string;
}