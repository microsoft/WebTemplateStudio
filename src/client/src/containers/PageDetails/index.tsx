import * as React from "react";
import { connect } from "react-redux";
import Details from "./Details";
import { IOption } from "../../types/option";
import { getScreenShot } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../store/ActionType";
import { setPageWizardPageAction } from "../../store/templates/pages/action";

interface IPageDetailsProps {
  originRoute: string;
  detailsPageInfo: IOption;
  isIntlFormatted: boolean;
}

interface IDispatchProps {
  setPage: (route: string) => any;
}

type Props = IPageDetailsProps & IDispatchProps;

const PageDetails = (props: Props) => {
  const { detailsPageInfo, isIntlFormatted, originRoute, setPage } = props;
  return (
    <div className={styles.detailsContainer}>
      <Details
        handleBackClick={()=>{setPage(originRoute)}}
        detailInfo={detailsPageInfo}
        formatteDetailInfo={isIntlFormatted ? detailsPageInfo : undefined}
      />
      <div className={styles.screenShotContainer}>
      {getScreenShot(detailsPageInfo.internalName, styles.screenshot)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IPageDetailsProps => ({
  originRoute : state.templates.detailsPage.originRoute,
    detailsPageInfo: state.templates.detailsPage.data,
    isIntlFormatted: state.templates.detailsPage.isIntlFormatted
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setPage: (route: string) => {
    dispatch(setPageWizardPageAction(route));
  }
});

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageDetails);
