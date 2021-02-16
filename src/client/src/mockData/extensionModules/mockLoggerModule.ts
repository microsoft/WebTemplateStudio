import { ILoggingPayload } from "../../types/logger";

const logFromWizard = (message: any) : void => {
  const logData = message.logData as ILoggingPayload;
  console.log(`Send to log in extension: ${JSON.stringify(logData)} `);
};

const openLog = () : void => {
  console.log(`Open log file in extension`);
};

export { logFromWizard, openLog };
