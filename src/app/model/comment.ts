import {User} from "./user";
import {Post} from "./post";

export interface Comment {
  id?: number,
  user?: any,
  content?: string,
  dateTime?: Date,
  post?: any,
}
