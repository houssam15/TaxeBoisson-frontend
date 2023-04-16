import { Local } from "./local";
import { Redevable } from "./redevable";


export class NotificationLocal {
    public  id!:number;
    public  ref!:string;
    public  redevable!:Redevable;
    public  notification!:Notification;
    public  local!:Local;
    public  montantEsstime!:number;
    public  dateActuelle!:Date;
  }
  