import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import * as getSvg from "../../utils/getSvgUrl";

import { IAzureFunctionsSelection, ISelectedAzureFunctionsService } from "../../reducers/wizardSelectionReducers/services/azureFunctionsReducer";

import { updateAzureFunctionNamesAction } from "../../actions/updateAzureFunctionNames";
import { getFunctionsSelection } from "../../selectors/azureFunctionsServiceSelector";

interface IProps {
    functionApps: IAzureFunctionsSelection;
}

interface IStateProps {
    azureFunctionsSelection: any;
}

interface IFunctionApp {
    appIndex: number;
    functionNames: string[]
}

interface IDispatchProps {
    updateFunctionNames: (functionApp: IFunctionApp) => any;
}

type Props = IProps & IDispatchProps & IStateProps;

/**
 *  The current implementation only allows for one Azure Function application to be created.
 *  This is stored in the redux state in an array at position 0, which is why the value of '0'
 *  is hardcoded in the current implementation.
 * 
 *  In the future, more than one Azure Function app can be created, and can simply be appended
 *  to the array data structure holding the Azure Function app selections (see reducer for Azure Functions)
 */
const AzureFunctionsSelection = ({functionApps, updateFunctionNames}: Props) => {
    const { selection } = functionApps;
    const { serviceType } = functionApps.wizardContent;
    const handleInputChange = (newTitle: string, idx: number) => {
        const { functionNames } = functionApps.selection[0];
        if (functionNames != null) {
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
                    {functionApp.functionNames != null && (functionApp.functionNames.map((functionName: string, idx: number) => 
                        <DraggableSidebarItem
                            key={functionApp.appName + idx.toString()}
                            closeSvgUrl={getSvg.getCancelSvg()}
                            withLargeIndent={true}
                            functionName={functionName}
                            handleInputChange={handleInputChange}
                            idx={idx + 1}
                        />))}
                </React.Fragment>))}
        </React.Fragment>
    )
}

const mapStateToProps = (state: any): IStateProps => ({
    azureFunctionsSelection: getFunctionsSelection(state),
})

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    updateFunctionNames: (functionApp: IFunctionApp) => { dispatch(updateAzureFunctionNamesAction(functionApp))},
})

export default connect(mapStateToProps, mapDispatchToProps)(AzureFunctionsSelection);