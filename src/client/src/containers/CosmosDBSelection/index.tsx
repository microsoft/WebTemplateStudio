import * as React from "react";
import { connect } from "react-redux";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import cancel from "../../assets/cancel.svg";

import { updateAzureFunctionNamesAction } from "../../actions/updateAzureFunctionNames";

interface IProps {
    cosmosSelection: any;
    serviceName: string;
}

// interface IFunctionApp {
//     appIndex: number;
//     functionNames: string[]
// }

// interface IDispatchProps {
//     updateFunctionNames: (functionApp: IFunctionApp) => any;
// }

type Props = IProps;

const CosmosDBSelection = ({cosmosSelection, serviceName}: Props) => {

    const handleInputChange = (newTitle: string, idx: number) => {
        // current implementation has only one function app at index 0
        // const { functionNames } = functionApps[0];
        // functionNames[idx] = newTitle;
        // updateFunctionNames({
        //     appIndex: 0,
        //     functionNames
        // });
    };

    return (cosmosSelection != null && cosmosSelection.map((cosmosDB: any, idx: number) =>         
            <DraggableSidebarItem
                text={cosmosDB.accountName}
                closeSvgUrl={`${
                    process.env.REACT_APP_RELATIVE_PATH
                }${cancel}`}
                itemTitle="Cosmos DB"
                withIndent={true}
            />
        )
    )
}

// const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
//     updateFunctionNames: (functionApp: IFunctionApp) => { dispatch(updateAzureFunctionNamesAction(functionApp))}
// })

export default connect(null, null)(CosmosDBSelection);