import { Service, Value } from "@tsed/di";
import { SignOptions, sign } from "jsonwebtoken";

import { Authentication } from "../models/Authentication";
import { JwtPayload } from "../protocols/jwt/interfaces/JwtPayload";
import { SettingService } from "./SettingService";
import { User } from "../models/User";

@Service()
export class AuthenticationService {

  @Value("JWT_SECRET_KEY")
  private readonly SECRET_KEY!: string;

  @Value("jwt")
  private readonly JWT_OPTIONS!: SignOptions;

  constructor(private readonly settingService: SettingService) {
  }

  async getPrincipal(id: number): Promise<Authentication | undefined> {
    return Authentication.query().findById(id);
  }

  async createToken(id: number): Promise<string> {
    const user = await User.query().findById(id).withGraphFetched("scopes");
    if (!user) {
      return Promise.reject();
    }
    const {TOKEN_VERSION} = await this.settingService.getSettings();
    const payload: JwtPayload = {
      id,
      scopes: user.scopes.map((scope) => scope.name),
      registeredAt: user.registeredAt,
      version: TOKEN_VERSION
    };
    return sign(payload, this.SECRET_KEY, this.JWT_OPTIONS);
  }
}
