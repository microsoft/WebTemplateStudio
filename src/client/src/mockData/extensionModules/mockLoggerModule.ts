import { ILoggingPayload } from "../../types/logger";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logFromWizard = (message: any): void => {
  const logData = message.logData as ILoggingPayload;
  console.log(`Send to log in extension: ${JSON.stringify(logData)} `);
};

const openLog = (): void => {
  console.log(`Open log file in extension`);
};

export { logFromWizard, openLog };
