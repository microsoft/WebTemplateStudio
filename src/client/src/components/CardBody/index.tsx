import * as React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.module.css";

interface IProps {
  body?: string;
  version?: string;
  formattedBody?: FormattedMessage.MessageDescriptor;
  expectedPrice?: FormattedMessage.MessageDescriptor;
  expextedTime?: FormattedMessage.MessageDescriptor;
}

type Props = InjectedIntlProps & IProps;

const CardBody = ({
  body,
  version,
  formattedBody,
  expectedPrice,
  expextedTime,
  intl
}: Props) => {
  return (
    <div className={styles.body}>
      {expectedPrice && <div>{expectedPrice}</div>}
      {expextedTime && <div>{expextedTime}</div>}
      {version && <div>v{version}</div>}
      {body || (formattedBody && intl.formatMessage(formattedBody))}{" "}
    </div>
  );
};

export default injectIntl(CardBody);
