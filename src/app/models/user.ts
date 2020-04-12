import { Type } from "./type";

/*
  Representation of each user in
  the cognito user pools
*/
export class user {
  name:string;
  email:string; // email & username are the same
  phone_number:string;
  picture:string;
  type:Type;
}
