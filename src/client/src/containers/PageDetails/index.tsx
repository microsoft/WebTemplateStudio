import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Details from "../../components/Details";
import { IOption } from "../../types/option";
import { screenShotMapping } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";

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
            src={screenShotMapping(detailsPageInfo.internalName)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any): IPageDetailsProps => {
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
