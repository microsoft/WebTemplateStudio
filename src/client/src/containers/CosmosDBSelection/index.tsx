import _ from "lodash";
import * as React from "react";

import * as getSvg from "../../utils/getSvgUrl";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import { ICosmosDB } from "../../reducers/wizardSelectionReducers/services/cosmosDbReducer";

interface IProps {
    cosmosSelection: ICosmosDB;
}

type Props = IProps;

// This component lives in "containers" because the accountName can change via redux in the future
const CosmosDBSelection = ({ cosmosSelection }: Props) => {
    const { serviceType } = cosmosSelection.wizardContent;
    return (
        <React.Fragment>
            {!_.isEmpty(cosmosSelection.selection) && cosmosSelection.selection.map((cosmosSelection: any) => {
                const { accountName } = cosmosSelection;
                return (
                <DraggableSidebarItem
                    key={accountName}
                    text={accountName}
                    closeSvgUrl={getSvg.getCancelSvg()}
                    itemTitle={serviceType}
                    withIndent={true}
                />)
            })}
        </React.Fragment>
    )
}

export default CosmosDBSelection;