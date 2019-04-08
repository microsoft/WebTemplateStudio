import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import Details from "../../components/Details";
import { IOption } from "../../types/option";
import { screenShotMapping } from "../../utils/getSvgUrl";
import styles from "./styles.module.css";

interface IPageDetailsProps {
  detailsPageInfo: IOption;
}

type Props = IPageDetailsProps & RouteComponentProps;

const PageDetails = (props: Props) => {
  return (
    <div className={styles.detailsContainer}>
      <Details
        handleBackClick={props.history.goBack}
        detailInfo={props.detailsPageInfo}
      />
      <div className={styles.screenShotContainer}>
        {screenShotMapping(props.detailsPageInfo.internalName) && (
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

const mapStateToProps = (state: any): IPageDetailsProps => {
  return {
    detailsPageInfo: state.wizardContent.detailsPage
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(PageDetails)
);
