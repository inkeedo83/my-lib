"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapTelemetry = exports.PrismaService = exports.PrismaModule = exports.PinoLogModule = void 0;
var pinoLogger_module_1 = require("./logger/pinoLogger.module");
Object.defineProperty(exports, "PinoLogModule", { enumerable: true, get: function () { return pinoLogger_module_1.PinoLogModule; } });
var prisma_module_1 = require("./prisma/prisma.module");
Object.defineProperty(exports, "PrismaModule", { enumerable: true, get: function () { return prisma_module_1.PrismaModule; } });
var prisma_service_1 = require("./prisma/prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
var tracing_1 = require("./telemetry/tracing");
Object.defineProperty(exports, "bootstrapTelemetry", { enumerable: true, get: function () { return tracing_1.bootstrapTelemetry; } });
//# sourceMappingURL=index.js.map