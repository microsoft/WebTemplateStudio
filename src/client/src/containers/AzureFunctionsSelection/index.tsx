import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import * as getSvg from "../../utils/getSvgUrl";

import { IAzureFunctionsSelection, ISelectedAzureFunctionsService } from "../../reducers/wizardSelectionReducers/services/azureFunctionsReducer";

import { updateAzureFunctionNamesAction } from "../../actions/updateAzureFunctionNames";

interface IProps {
    functionApps: IAzureFunctionsSelection;
}

interface IFunctionApp {
    appIndex: number;
    functionNames: string[]
}

interface IDispatchProps {
    updateFunctionNames: (functionApp: IFunctionApp) => any;
}

type Props = IProps & IDispatchProps;

/**
 *  The current implementation only allows for one Azure Function application to be created.
 *  This is stored in the redux state in an array at position 0, which is why the value of '0'
 *  is hardcoded in the current implementation.
 * 
 *  In the future, more than one Azure Function app can be created, and can simply be appended
 *  to the array data structure holding the Azure Function app selections (see reducer for Azure Functions)
 */
const AzureFunctionsSelection = ({ functionApps, updateFunctionNames }: Props) => {
    const { selection } = functionApps;
    const { serviceType } = functionApps.wizardContent;
    const handleInputChange = (newTitle: string, idx: number) => {
        const { functionNames } = functionApps.selection[0];
        if (functionNames) {
            functionNames[idx] = newTitle;
            updateFunctionNames({
                appIndex: 0,
                functionNames
            });
        }
    };
    return (
        <React.Fragment>
            {!_.isEmpty(selection) && selection.map((functionApp: ISelectedAzureFunctionsService, idx: number) => (
                <React.Fragment key={serviceType + functionApp.appName + idx}>
                    <DraggableSidebarItem
                        key={functionApp.appName + idx}
                        text={functionApp.appName}
                        closeSvgUrl={getSvg.getCancelSvg()}
                        itemTitle={serviceType}
                        withIndent={true}
                    />
                    {functionApp.functionNames && (functionApp.functionNames.map((functionName: string, idx: number) =>
                        <DraggableSidebarItem
                            key={functionApp.appName + idx.toString()}
                            closeSvgUrl={getSvg.getCancelSvg()}
                            withLargeIndent={true}
                            azureFunctionName={functionName}
                            handleInputChange={handleInputChange}
                            idx={idx + 1}
                        />))}
                </React.Fragment>))}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    updateFunctionNames: (functionApp: IFunctionApp) => { dispatch(updateAzureFunctionNamesAction(functionApp)) },
})

export default connect(null, mapDispatchToProps)(AzureFunctionsSelection);