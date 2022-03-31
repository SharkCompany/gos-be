import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Google } from "./google.entity";

export class User {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  isBlocked: boolean;
}
