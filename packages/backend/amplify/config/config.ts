import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

type EnvKeysType = "SQS_QUEUE_URL" | "SQS_QUEUE_NAME";
class Configuration {
  private static instance: Configuration;
  private config: Map<EnvKeysType, string> = new Map();
  private constructor() {}

  static getInstance(): Configuration {
    if (!Configuration.instance) {
      console.log("Initializing the instance");
      const instance = new Configuration();
      instance.set("SQS_QUEUE_URL", process.env.SQS_QUEUE_URL as string);
      Configuration.instance = instance;
    }
    console.log("I am being called from getInstance");
    return Configuration.instance;
  }

  get(key: EnvKeysType) {
    return this.config.get(key);
  }

  set(key: EnvKeysType, value: string) {
    this.config.set(key, value);
  }
}

export const config = Configuration.getInstance();
