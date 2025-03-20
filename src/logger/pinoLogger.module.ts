import { Global, Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { stdTimeFunctions } from "pino";

import {
  LoggerModuleClass,
  LOGGER_OPTIONS_TOKEN,
} from "./pinoLogger.module-definition";
import { LoggerConfigs } from "../types/types";

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [LOGGER_OPTIONS_TOKEN],
      useFactory: ({ isProduction, enabled }: LoggerConfigs) => {
        return {
          pinoHttp: {
            timestamp: stdTimeFunctions.isoTime,

            level: isProduction ? "info" : "debug",
            redact: ["req.headers.authorization", "req.headers.cookie"],
            enabled: enabled,
            transport: isProduction
              ? undefined
              : {
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                    ignore: "pid,hostname",
                  },
                },
          },
        };
      },
    }),
  ],
})
export class PinoLogModule extends LoggerModuleClass {}
