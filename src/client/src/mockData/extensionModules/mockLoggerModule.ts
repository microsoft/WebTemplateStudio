import { ILoggingPayload } from "../../types/logger";

const logFromWizard = (message: any) => {
  const logData = message.logData as ILoggingPayload;
  console.log(`Send to log in extension: ${JSON.stringify(logData)} `);
};

const openLog = () => {
  console.log(`Open log file in extension`);
};

export { logFromWizard, openLog };
