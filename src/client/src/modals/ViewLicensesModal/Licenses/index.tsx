import * as React from "react";
import { useSelector } from "react-redux";
import { ILicenseObject } from "../../../types/license";

import styles from "./styles.module.css";
import { injectIntl } from "react-intl";

import { getGenerationData } from "../../../store/userSelection/app/selector";
import { getAllLicenses } from "../../../utils/extensionService/extensionService";
import { AppContext } from "../../../AppContext";

const Licenses = () => {
  const { vscode } = React.useContext(AppContext);
  const generationData = useSelector(getGenerationData);
  const [licenses, setLicenses] = React.useState<ILicenseObject[]>([]);
  React.useEffect(()=>{
    getAllLicenses(generationData, vscode).then((event)=>{
      setLicenses(event.data.payload.licenses);
    });
  },[]);

  return (
    <div className={styles.container}>
      {licenses.map((license: ILicenseObject) => (
          <p key={license.url}>
            <a
              className={styles.licenseButton}
              href={String(license.url)}
              key={license.text}
              target={"_blank"}
              rel="noreferrer noopener"
            >
              {license.text}
            </a>
          </p>
        ))}
    </div>
  );
};

export default (injectIntl(Licenses));
