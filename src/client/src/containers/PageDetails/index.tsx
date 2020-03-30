import * as React from "react";
import { connect } from "react-redux";
import Details from "./Details";
import { IOption } from "../../types/option";
import { getScreenShot } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";
import { AppState } from "../../store/combineReducers";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
}

type Props = IPageDetailsProps;

const PageDetails = (props: Props) => {
  const { detailsPageInfo } = props;
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.screenShotContainer}>
      {getScreenShot(detailsPageInfo.internalName, styles.screenshot)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IPageDetailsProps => ({
    detailsPageInfo: state.wizardContent.detailsPage.data,
});

export default
  connect(
    mapStateToProps
  )(PageDetails);
