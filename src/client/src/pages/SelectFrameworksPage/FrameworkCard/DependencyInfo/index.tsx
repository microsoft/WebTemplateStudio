import classnames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import Notification from "../../../../components/Notification";
import { IRequirement } from "../../../../types/option";
import { REQUIREMENTS_DATA } from "../../../../utils/constants/constants";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  requirement: IRequirement;
}

type Props = IProps & InjectedIntlProps;

const DependencyInfo = ({ requirement, intl }: Props) => {
  const { formatMessage } = intl;
  const { name, version } = requirement;
  const requirementData = REQUIREMENTS_DATA.find((r) => r.name === name);

  return (
    <div>
      {requirement && (
        <a
          href={requirementData?.downloadLink}
          className={classnames(styles.dependencyContainer, styles.borderYellow)}
          target={"_blank"}
          rel="noreferrer noopener"
        >
          <Notification showWarning={true} altMessage={formatMessage(messages.iconAltMessage)}>
            {formatMessage(messages.notInstalled, { name: requirementData?.displayName, version })}
          </Notification>
        </a>
      )}
    </div>
  );
};

export default injectIntl(DependencyInfo);
