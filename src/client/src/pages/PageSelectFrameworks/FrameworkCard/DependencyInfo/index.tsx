import * as React from "react";
import styles from "./styles.module.css";
import classnames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Notification from "../../../../components/Notification";
import messages from "./messages";
import { FRAMEWORK_DEPENDENCY } from "../../../../utils/constants/constants";

export interface IDependency {
  name: string;
  minimumVersion: string;
  downloadLink: string;
  privacyStatementLink: string;
  downloadLinkLabel: string;
}

const dependencies = {
  Node: {
    name: "Node",
    minimumVersion: "v12.0+",
    downloadLink: "https://nodejs.org/en/download/",
    privacyStatementLink: "https://nodejs.org/en/about/privacy/",
    downloadLinkLabel: "Node download link",
  },
  Python: {
    name: "Python",
    minimumVersion: "v3.5+",
    downloadLink: "https://www.python.org/downloads/",
    privacyStatementLink: "https://www.python.org/privacy/",
    downloadLinkLabel: "Python download link",
  },
  NetCore: {
    name: ".NET Core",
    minimumVersion: "v3.1+",
    downloadLink: "https://dotnet.microsoft.com/download",
    privacyStatementLink: "https://dotnet.microsoft.com/privacy",
    downloadLinkLabel: ".NET Core download link",
  },
};

const dependenciesMap: Map<string, IDependency> = new Map([
  [FRAMEWORK_DEPENDENCY.NODE, dependencies.Node],
  [FRAMEWORK_DEPENDENCY.PYTHON, dependencies.Python],
  [FRAMEWORK_DEPENDENCY.NETCORE, dependencies.NetCore],
]);

interface IProps {
  requirement: string;
}

type Props = IProps & InjectedIntlProps;

const DependencyInfo = ({ requirement, intl }: Props) => {
  const [dependency, setDependency] = React.useState<IDependency | undefined>();
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const localDepency = dependenciesMap.get(requirement);
    setDependency(localDepency);

    if (localDepency) {
      const { name, minimumVersion } = localDepency;
      setMessage(intl.formatMessage(messages.notInstalled, { name, minimumVersion }));
    }
  }, []);

  return (
    <div>
      {dependency && message && (
        <a
          href={dependency.downloadLink}
          className={classnames(styles.dependencyContainer, styles.borderYellow)}
          target={"_blank"}
          rel="noreferrer noopener"
        >
          <Notification showWarning={true} text={message} altMessage={intl.formatMessage(messages.iconAltMessage)} />
        </a>
      )}
    </div>
  );
};

export default injectIntl(DependencyInfo);
