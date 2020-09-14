import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { ICosmosDB } from "../../../../store/userSelection/services/cosmosDb/model";
import { openCosmosDbModalAction } from "../../../../store/navigation/modals/action";
import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { removeCosmosDbAction } from "../../../../store/userSelection/services/cosmosDb/action";
import messages from "./messages";

interface IProps {
  cosmosSelection: ICosmosDB | null;
}

type Props = IProps & InjectedIntlProps;

const CosmosDBSelection = ({
  cosmosSelection,
  intl
}: Props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {cosmosSelection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            cosmosDB={true}
            editable={false}
            configurable={true}
            customInputStyle={styles.input}
            key={cosmosSelection.accountName}
            text={cosmosSelection.accountName}
            withIndent={true}
            handleCloseClick={() => dispatch(removeCosmosDbAction())}
            handleConfigClick={() => dispatch(openCosmosDbModalAction())}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(CosmosDBSelection);
