"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER_OPTIONS_TYPE = exports.LOGGER_OPTIONS_TOKEN = exports.LoggerModuleClass = void 0;
const common_1 = require("@nestjs/common");
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName("forRoot")
    .build(), exports.LoggerModuleClass = _a.ConfigurableModuleClass, exports.LOGGER_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN, exports.LOGGER_OPTIONS_TYPE = _a.OPTIONS_TYPE;
//# sourceMappingURL=pinoLogger.module-definition.js.map