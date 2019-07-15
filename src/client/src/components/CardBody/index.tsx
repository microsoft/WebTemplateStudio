import * as React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.module.css";

interface IProps {
  body?: string;
  version?: string;
  formattedBody?: FormattedMessage.MessageDescriptor;
}

type Props = InjectedIntlProps & IProps;

const CardBody = ({ body, version, formattedBody, intl }: Props) => {
  return (
    <div className={styles.body}>
      {body || (formattedBody && intl.formatMessage(formattedBody))}
      {version && <div>v{version}</div>}
    </div>
  );
};

export default injectIntl(CardBody);
