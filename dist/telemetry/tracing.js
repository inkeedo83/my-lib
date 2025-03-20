"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telemetry = void 0;
exports.bootstrapTelemetry = bootstrapTelemetry;
const common_1 = require("@nestjs/common");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_nestjs_core_1 = require("@opentelemetry/instrumentation-nestjs-core");
const resources_1 = require("@opentelemetry/resources");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const instrumentation_1 = require("@prisma/instrumentation");
// Константы для семантических атрибутов ресурсов
const OTEL_SERVICE_NAME = "service.name";
const DEPLOYMENT_ENVIRONMENT = "deployment.environment";
class Telemetry {
    constructor(config) {
        this.otelSDK = null;
        this.isInitializing = false;
        this.logger = new common_1.Logger(Telemetry.name);
        this.config = config;
        this.initialize();
    }
    static getInstance(configs) {
        if (!Telemetry.instance)
            Telemetry.instance = new Telemetry(configs);
        return Telemetry.instance;
    }
    initialize() {
        if (this.otelSDK || this.isInitializing) {
            this.logger.log("Телеметрия уже инициализирована или в процессе инициализации");
            return;
        }
        try {
            this.isInitializing = true;
            const resource = new resources_1.Resource({
                [OTEL_SERVICE_NAME]: this.config.OTEL_SERVICE_NAME,
                [DEPLOYMENT_ENVIRONMENT]: this.config.OTEL_SERVICE_NAME,
            });
            const { traceExporter } = this.createExporters();
            const traceProcessor = new sdk_trace_base_1.BatchSpanProcessor(traceExporter);
            const instrumentations = this.createInstrumentations();
            this.otelSDK = new sdk_node_1.NodeSDK({
                resource,
                spanProcessor: traceProcessor,
                instrumentations,
            });
            this.otelSDK.start();
            this.logger.log("Телеметрия успешно инициализирована");
            this.setupShutdownHandlers();
        }
        catch (error) {
            this.logger.error("Ошибка при инициализации телеметрии:", error);
        }
        finally {
            this.isInitializing = false;
        }
    }
    setupShutdownHandlers() {
        const shutdownHandler = () => {
            if (this.otelSDK)
                this.otelSDK
                    .shutdown()
                    .then(() => this.logger.log("SDK успешно завершил работу"), (err) => this.logger.error("Ошибка при завершении работы SDK", err))
                    .finally(() => {
                    this.otelSDK = null;
                    process.exit(0);
                });
            else
                process.exit(0);
        };
        process.on("SIGTERM", shutdownHandler);
        process.on("SIGINT", shutdownHandler);
    }
    createExporters() {
        return {
            traceExporter: new exporter_trace_otlp_http_1.OTLPTraceExporter({
                url: this.config.OTEL_JAEGER_ENDPOINT,
            }),
        };
    }
    createInstrumentations() {
        return [
            new instrumentation_http_1.HttpInstrumentation({
                ignoreIncomingRequestHook: (request) => {
                    return request.url === "/api/live/ws" || request.url === "/health";
                },
            }),
            new instrumentation_express_1.ExpressInstrumentation(),
            new instrumentation_nestjs_core_1.NestInstrumentation(),
            new instrumentation_1.PrismaInstrumentation(),
        ];
    }
}
exports.Telemetry = Telemetry;
Telemetry.instance = null;
function bootstrapTelemetry({ NODE_ENV, ENABLE_OTEL, ...configs }) {
    if (NODE_ENV === "test" || !ENABLE_OTEL)
        return;
    Telemetry.getInstance(configs);
}
//# sourceMappingURL=tracing.js.map