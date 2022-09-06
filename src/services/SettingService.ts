import { Service } from "@tsed/di";
import { Setting } from "src/models/Setting";

@Service()
export class SettingService {

  async getSettings(): Promise<Record<string, string>> {
    return await Setting.query()
      .then((settings) => {
        return settings
          .map((setting) => ({[setting.key]: setting.value}))
          .reduce((settings, setting) => ({...settings, ...setting}), {});
      });
  }
}