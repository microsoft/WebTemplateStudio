import * as React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { ReactComponent as PriceSVG } from "../../assets/money.svg";
import { ReactComponent as TimeSVG } from "../../assets/timer.svg";

import styles from "./styles.module.css";

interface IProps {
  body?: string;
  version?: string;
  latestVersion?: string;
  formattedBody?: string;
  expectedTime?: string;
  expectedPrice?: string;
}

type Props = InjectedIntlProps & IProps;

const CardBody = ({
  body,
  version,
  latestVersion,
  formattedBody,
  expectedTime,
  expectedPrice,
  intl
}: Props) => {
  return (
    <div className={styles.body}>
      {version &&
      <div className={styles.versionGridLayout}>
        <div>v{version}</div>
        {latestVersion && latestVersion!==version && <div className={styles.latestVersion}>(latest version: v{latestVersion})</div>}
      </div>}
      {expectedPrice &&
        <div className={styles.expectedPrice}>
          {expectedPrice && <PriceSVG className={styles.svg} />}
          {expectedPrice && <div>{expectedPrice}</div>}
        </div>
      }
      {expectedTime &&
        <div className={styles.expectedTime}>
          {expectedTime && <TimeSVG className={styles.svg} />}
          {expectedTime && <div>{expectedTime}</div>}
      </div>
      }
      <div className={styles.formattedBody}>
        {body || (formattedBody && formattedBody)}
      </div>
    </div>
  );
};

export default injectIntl(CardBody);
