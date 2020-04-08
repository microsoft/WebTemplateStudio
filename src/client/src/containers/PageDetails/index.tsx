import * as React from "react";
import { connect, useDispatch } from "react-redux";
import Details from "./Details";
import { IOption } from "../../types/option";
import { getScreenShot } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";
import { setPageWizardPageAction } from "../../store/config/pages/action";

interface IPageDetailsProps {
  originRoute: string;
  detailsPageInfo: IOption;
  isIntlFormatted: boolean;
}

type Props = IPageDetailsProps;

const PageDetails = (props: Props) => {
  const { detailsPageInfo, isIntlFormatted, originRoute } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.detailsContainer}>
      <Details
        handleBackClick={()=>{dispatch(setPageWizardPageAction(originRoute))}}
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
  originRoute : state.config.detailsPage.originRoute,
    detailsPageInfo: state.config.detailsPage.data,
    isIntlFormatted: state.config.detailsPage.isIntlFormatted
});

export default
  connect(
    mapStateToProps
  )(PageDetails);
