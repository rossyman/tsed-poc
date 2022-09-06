import { Request } from "@tsed/common";
import { StoreSet, useDecorators } from "@tsed/core";
import { Unauthorized } from "@tsed/exceptions";
import { Middleware, UseBefore } from "@tsed/platform-middlewares";
import { Context } from "@tsed/platform-params";
import { Authentication } from "src/models/Authentication";

@Middleware()
export class ScopesMiddleware {
  use(@Request() request: Request, @Context() context: Context) {
    if (request.isAuthenticated() && request.user) {

      const principalScopes = (<Authentication>request.user).scopes.map((scope) => scope.name);
      const scopes: string[] = context.endpoint.get(ScopesMiddleware);

      if (!scopes.some((scope) => principalScopes.includes(scope))) {
        throw new Unauthorized("Insufficient scopes");
      }
    }
  }
}

export function Scopes(...scopes: string[]): MethodDecorator {
  return useDecorators(
    UseBefore(ScopesMiddleware),
    StoreSet(ScopesMiddleware, scopes)
  );
}
