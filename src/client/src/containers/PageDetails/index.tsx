import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Details from "../Details";
import { IOption } from "../../types/option";
import { screenShotMapping } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";
import { AppState } from "../../reducers";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
  isIntlFormatted: boolean;
}

type Props = IPageDetailsProps & RouteComponentProps;

const PageDetails = (props: Props) => {
  const { history, detailsPageInfo, isIntlFormatted } = props;
  return (
    <div className={styles.detailsContainer}>
      <Details
        handleBackClick={history.goBack}
        detailInfo={detailsPageInfo}
        formatteDetailInfo={isIntlFormatted ? detailsPageInfo : undefined}
      />
      <div className={styles.screenShotContainer}>
        {screenShotMapping(detailsPageInfo.internalName) && (
          <img
            className={styles.screenshot}
            src={screenShotMapping(props.detailsPageInfo.internalName)}
            alt="Screenshot preview of web page that will be generated"
          />
        )}
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

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PageDetails)
);
