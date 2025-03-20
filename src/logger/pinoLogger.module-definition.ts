import { ConfigurableModuleBuilder } from "@nestjs/common";
import { LoggerConfigs } from "../types/types";

export const {
  ConfigurableModuleClass: LoggerModuleClass,
  MODULE_OPTIONS_TOKEN: LOGGER_OPTIONS_TOKEN,
  OPTIONS_TYPE: LOGGER_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<LoggerConfigs>()
  .setClassMethodName("forRoot")
  .build();
