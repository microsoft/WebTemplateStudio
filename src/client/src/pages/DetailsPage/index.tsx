import * as React from "react";
import { connect, useDispatch } from "react-redux";

import { AppState } from "../../store/combineReducers";
import { setDetailPageAction } from "../../store/config/detailsPage/action";
import { IOption } from "../../types/option";
import { getScreenShot } from "../../utils/getSvgUrl";
import Details from "./Details";
import styles from "./styles.module.css";

interface IDetailsPageProps {
  originRoute: string;
  detailsPageInfo: IOption;
  isIntlFormatted: boolean;
}

type Props = IDetailsPageProps;

const DetailsPage = (props: Props) => {
  const { detailsPageInfo, isIntlFormatted } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.detailsContainer}>
      <Details
        handleBackClick={() => {
          const optionDetailPageBack: IOption = { title: "", internalName: "", body: "", icon: "" };
          dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
        }}
        detailInfo={detailsPageInfo}
        formatteDetailInfo={isIntlFormatted ? detailsPageInfo : undefined}
      />
      <div className={styles.screenShotContainer}>{getScreenShot(detailsPageInfo.internalName, styles.screenshot)}</div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IDetailsPageProps => ({
  originRoute: state.config.detailsPage.originRoute,
  detailsPageInfo: state.config.detailsPage.data,
  isIntlFormatted: state.config.detailsPage.isIntlFormatted,
});

export default connect(mapStateToProps)(DetailsPage);
