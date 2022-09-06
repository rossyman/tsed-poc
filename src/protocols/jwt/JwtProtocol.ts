import { Args, OnVerify, Protocol } from "@tsed/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { config } from "src/config";
import { Authentication } from "src/models/Authentication";
import { AuthenticationService } from "src/services/AuthenticationService";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET_KEY,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE
  }
})
export class JwtProtocol implements OnVerify {

  constructor(private readonly authenticationService: AuthenticationService) {
  }

  async $onVerify(@Args() [{id}]: [JwtPayload]): Promise<Authentication | false> {
    return await this.authenticationService.getPrincipal(id) || false;
  }
}
