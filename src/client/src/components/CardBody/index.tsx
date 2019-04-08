import * as React from "react";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";

import styles from "./styles.module.css";

interface IProps {
  body?: string;
  formattedBody?: FormattedMessage.MessageDescriptor;
}

type Props = InjectedIntlProps & IProps;

const CardBody = ({ body, formattedBody, intl }: Props) => {
  return (
    <div className={styles.body}>
      {body || (formattedBody && intl.formatMessage(formattedBody))}
    </div>
  );
};

export default injectIntl(CardBody);
