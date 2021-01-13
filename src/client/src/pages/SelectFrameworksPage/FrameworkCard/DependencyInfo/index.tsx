import * as React from "react";
import styles from "./styles.module.css";
import classnames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Notification from "../../../../components/Notification";
import messages from "./messages";
import { REQUIREMENTS_DATA } from "../../../../utils/constants/constants";
import { IRequirement } from "../../../../types/option";

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
