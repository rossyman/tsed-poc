import { Entity, IdColumn } from "@tsed/objection";

import { Model } from "objection";
import { Property } from "@tsed/schema";

@Entity("scope")
export class Scope extends Model {
  @IdColumn()
  id!: number;
  @Property()
  name!: string;
}