import { user } from "./user";

export class userinformation extends user {
    enabled:boolean;
    status:string;
    created:Date;
    lastmodified:Date;
    username:string;
}