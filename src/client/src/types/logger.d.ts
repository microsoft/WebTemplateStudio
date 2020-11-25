export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export type ILoggingPayload = {
  level: LogLevel;
  data: string;
};
