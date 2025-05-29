import { createParamDecorator, ExecutionContext, Injectable } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    console.log('Usuario: ', request.user);
    return request.user;
  },
);