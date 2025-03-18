import { ConfigurableModuleBuilder } from "@nestjs/common";
import { LoggerConfigs } from "../types/types";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<LoggerConfigs>()
    .setClassMethodName("forRootAsync")
    .build();
