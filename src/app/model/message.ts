export interface Message {
  id?: number;
  sender?: any;
  receiver?: any;
  content?: string;
  status?: boolean;
  dateTime?: Date;
  chatRoom?: any;
}
