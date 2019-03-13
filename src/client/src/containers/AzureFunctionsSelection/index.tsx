import * as React from "react";
import { connect } from "react-redux";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import cancel from "../../assets/cancel.svg";

import { updateAzureFunctionNamesAction } from "../../actions/updateAzureFunctionNames";

interface IProps {
    functionApps: any;
    serviceName: string;
}

interface IFunctionApp {
    appIndex: number;
    functionNames: string[]
}

interface IDispatchProps {
    updateFunctionNames: (functionApp: IFunctionApp) => any;
}

type Props = IProps & IDispatchProps;

const AzureFunctionsSelection = ({functionApps, serviceName, updateFunctionNames}: Props) => {

    const handleInputChange = (newTitle: string, idx: number) => {
        // current implementation has only one function app at index 0
        const { functionNames } = functionApps[0];
        functionNames[idx] = newTitle;
        updateFunctionNames({
            appIndex: 0,
            functionNames
        });
    };

    return ( functionApps != null && functionApps.map((functionApp: any, idx: number) =>         
        <React.Fragment key={functionApp.appName + idx}>
            <DraggableSidebarItem
                text={functionApp.appName}
                closeSvgUrl={`${
                    process.env.REACT_APP_RELATIVE_PATH
                }${cancel}`}
                itemTitle="Azure Functions"
            />
            {functionApp.functionNames != null && (functionApp.functionNames.map((functionName: string, idx: number) => 
                <DraggableSidebarItem
                    key={functionName + idx}
                    closeSvgUrl={`${
                    process.env.REACT_APP_RELATIVE_PATH
                    }${cancel}`}
                    withIndent={true}
                    functionName={functionName}
                    handleInputChange={handleInputChange}
                    idx={idx + 1}
                />))}
        </React.Fragment>)
    )
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    updateFunctionNames: (functionApp: IFunctionApp) => { dispatch(updateAzureFunctionNamesAction(functionApp))}
})

export default connect(null, mapDispatchToProps)(AzureFunctionsSelection);