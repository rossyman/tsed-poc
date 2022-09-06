import { Entity, IdColumn } from "@tsed/objection";

import { Model } from "objection";
import { Property } from "@tsed/schema";

@Entity("setting")
export class Setting extends Model {
  @IdColumn()
  id!: number;
  @Property()
  key!: string;
  @Property()
  value!: string;
}