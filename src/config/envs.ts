import "dotenv/config";
import * as joi from "joi";

interface EnvironmentVariables {
  PORT: number;
}

class EnvConfig {
  static processEnv() {
    const envSchema = joi
      .object({
        PORT: joi.number().required(),
      })
      .unknown(true);

    const { error, value } = envSchema.validate(process.env);

    if (error) {
      throw new Error(`Environment config validation error: ${error.message}`);
    }

    const environmentVariables: EnvironmentVariables = value;

    return {
      PORT: environmentVariables.PORT,
    } as const;
  }
}

export const envs = EnvConfig.processEnv();
