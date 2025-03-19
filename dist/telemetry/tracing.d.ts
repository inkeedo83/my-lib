import { TelemetryConfigs, TelemetryBootstrapConfigs } from "../types/types";
export declare class Telemetry {
    private static instance;
    private otelSDK;
    private isInitializing;
    private meterProvider;
    private loggerProvider;
    private config;
    private logger;
    constructor(config: TelemetryConfigs);
    static getInstance(configs: TelemetryConfigs): Telemetry;
    initialize(): void;
    private setupShutdownHandlers;
    private createExporters;
    private createInstrumentations;
}
export declare function bootstrapTelemetry({ NODE_ENV, ENABLE_OTEL, ...configs }: TelemetryBootstrapConfigs): void;
//# sourceMappingURL=tracing.d.ts.map