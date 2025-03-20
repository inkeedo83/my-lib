"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.PinoLogModule = void 0;
var pinoLogger_module_1 = require("./pinoLogger.module");
Object.defineProperty(exports, "PinoLogModule", { enumerable: true, get: function () { return pinoLogger_module_1.PinoLogModule; } });
var nestjs_pino_1 = require("nestjs-pino");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return nestjs_pino_1.Logger; } });
//# sourceMappingURL=index.js.map