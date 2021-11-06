import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column({ type: "text", nullable: true })
  firstName: string;

  @Field()
  @Column({ type: "text", nullable: true })
  lastName: string;

  @Field({nullable: true})
  @Column({ type: "text", unique: true, nullable: true })
  email: string;

  @Column({ type: "text", nullable: true })
  password: string; 
}
