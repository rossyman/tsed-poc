import { Entity, IdColumn } from "@tsed/objection";

import { DateTime } from "@tsed/schema";
import { Model } from "objection";

@Entity("user")
export class User extends Model {
  @IdColumn()
  id!: string;
  @DateTime()
  registeredAt!: string;
}
