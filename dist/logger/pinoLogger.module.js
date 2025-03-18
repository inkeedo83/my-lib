"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const pino_1 = require("pino");
const module_definition_1 = require("./module-definition");
let pinoLoggerModule = class pinoLoggerModule extends module_definition_1.ConfigurableModuleClass {
};
exports.pinoLoggerModule = pinoLoggerModule;
exports.pinoLoggerModule = pinoLoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRootAsync({
                inject: [module_definition_1.MODULE_OPTIONS_TOKEN],
                useFactory: ({ isProduction, enabled }) => {
                    return {
                        pinoHttp: {
                            timestamp: pino_1.stdTimeFunctions.isoTime,
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
], pinoLoggerModule);
//# sourceMappingURL=pinoLogger.module.js.map