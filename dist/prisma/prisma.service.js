"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const module_definition_1 = require("./module-definition");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor(configs) {
        super({
            log: configs.enableLogging ? ["error"] : [],
            datasourceUrl: configs.datasourceUrl,
        });
        this.configs = configs;
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        await this.$connect();
        // ПРИМЕЧАНИЕ: метод $use помечен как устаревший, но пока еще поддерживается
        // В будущем его нужно будет заменить на Prisma Extensions
        // @see https://www.prisma.io/docs/orm/prisma-client/client-extensions/query
        if (this.configs.enableLogging)
            this.$use(async (params, next) => {
                const before = Date.now();
                const result = await next(params);
                const after = Date.now();
                this.logger.debug(`Prisma запрос: ${params.model}.${params.action} выполнен за ${after - before}ms`);
                return result;
            });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(module_definition_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map