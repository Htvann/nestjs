import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Types } from "mongoose";

export interface ICurrentUser {
  userId: Types.ObjectId;
}
export const CurrentUserDto = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
