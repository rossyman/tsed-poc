import { DateTime, Property } from "@tsed/schema";
import { Entity, IdColumn } from "@tsed/objection";

import { Model } from "objection";
import { Scope } from "./Scope";

@Entity("user")
export class User extends Model {
  @IdColumn()
  id!: string;
  // @ManyToMany()
  @Property()
  scopes!: Scope[];
  @DateTime()
  registeredAt!: string;
}
