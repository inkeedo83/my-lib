export type LoggerConfigs = {
    isProduction: boolean;
    enabled: boolean;
};
export type PrismaConfigs = {
    datasourceUrl: boolean;
    enableLogging: boolean;
};
export type TelemetryConfigs = {
    OTEL_SERVICE_NAME: string;
    OTEL_JAEGER_ENDPOINT: string;
};
export type TelemetryBootstrapConfigs = {
    NODE_ENV: string;
    ENABLE_OTEL: boolean;
} & Partial<TelemetryConfigs>;
//# sourceMappingURL=types.d.ts.map