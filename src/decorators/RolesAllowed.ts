import {useDecorators, StoreSet} from "@tsed/core";
import {Middleware, UseBefore} from "@tsed/platform-middlewares";
import {Context} from "@tsed/platform-params";
import {Req, Res} from "@tsed/common";

@Middleware()
export class RolesAllowedMiddleware {
  use(@Req() req: Req, @Res() res: Res, @Context() context: Context) {
    const roles: string[] = context.endpoint.get(RolesAllowedMiddleware);
    // TODO: Check claimed roles against allowed roles
  }
}

export function RolesAllowed(...roles: string[]): MethodDecorator {
  return useDecorators(
    StoreSet(RolesAllowedMiddleware, roles),
    UseBefore(RolesAllowedMiddleware)
  );
}
