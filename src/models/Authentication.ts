import { CollectionOf, Email, Ignore, Property } from "@tsed/schema";
import { Entity, IdColumn } from "@tsed/objection";

import { Model } from "objection";
import { Scope } from "./Scope";

@Entity("authentication")
export class Authentication extends Model {

  @IdColumn()
  id!: string;

  @Email()
  email!: string;

  @Ignore()
  password!: string;

  @Property()
  userId!: string;

  // @ManyToMany()
  @CollectionOf(Scope)
  scopes!: Scope[];

  // @BelongsToOne()
  // user?: User;
}
