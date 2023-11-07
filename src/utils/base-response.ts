import { Document } from 'mongoose';

export class Base_Response<T extends Document> {
  public success: boolean;
  public status: number;
  public data?: T;

  constructor(props: Base_Response<T>) {
    this.success = props.success;
    this.status = props.status;
    this.data = props.data;
  }
}
