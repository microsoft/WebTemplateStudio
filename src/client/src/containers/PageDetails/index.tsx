import * as React from "react";
import { connect } from "react-redux";
import Details from "./Details";
import { IOption } from "../../types/option";
import { getScreenShot } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
  isIntlFormatted: boolean;
}

type Props = IPageDetailsProps;

const PageDetails = (props: Props) => {
  const { detailsPageInfo, isIntlFormatted } = props;
  return (
    <div className={styles.detailsContainer}>
     
      <div className={styles.screenShotContainer}>
      {getScreenShot(detailsPageInfo.internalName, styles.screenshot)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IPageDetailsProps => {
  return {
    detailsPageInfo: state.wizardContent.detailsPage.data,
    isIntlFormatted: state.wizardContent.detailsPage.isIntlFormatted
  };
};

export default 
  connect(
    mapStateToProps,
    null
  )(PageDetails);
