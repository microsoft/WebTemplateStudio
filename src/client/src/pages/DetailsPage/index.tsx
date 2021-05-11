import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as BackArrow } from "../../assets/backarrow.svg";
import Icon from "../../components/Icon";
import Title from "../../components/Titles/Title";
import { AppState } from "../../store/combineReducers";
import { setDetailPageAction } from "../../store/config/detailsPage/action";
import { IOption } from "../../types/option";
import { KEY_EVENTS } from "../../utils/constants/constants";
import { getScreenShot } from "../../utils/getSvgUrl";
import Details from "./Details";
import messages from "./messages";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const DetailsPage = (props: Props) => {
  const { intl } = props;
  const detailsPageInfo = useSelector((state: AppState) => state.config.detailsPage.data);
  const isIntlFormatted = useSelector((state: AppState) => state.config.detailsPage.isIntlFormatted);

  const dispatch = useDispatch();

  const handleBackClick = () => {
    const optionDetailPageBack: IOption = { title: "", internalName: "", body: "", icon: "" };
    dispatch(setDetailPageAction(optionDetailPageBack, false, ""));
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleBackClick();
    }
  };

  return (
    <div>
      <div className={styles.backContainer}>
        <div
          role="button"
          tabIndex={0}
          onClick={handleBackClick}
          onKeyDown={keyDownHandler}
          className={styles.innerBackContainer}
        >
          <BackArrow className={styles.backIcon} />
          <div className={styles.details}>{intl.formatMessage(messages.back)}</div>
        </div>
      </div>
      <div className={styles.headerContainer}>
        {detailsPageInfo.title && <Icon name={detailsPageInfo.title.toString()} icon={detailsPageInfo.icon} />}
        <Title>{detailsPageInfo.title}</Title>
      </div>
      <div className={styles.detailsContainer}>
        <Details detailInfo={detailsPageInfo} formatteDetailInfo={isIntlFormatted ? detailsPageInfo : undefined} />
        <div className={styles.screenShotContainer}>
          {getScreenShot(detailsPageInfo.internalName, styles.screenshot)}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(DetailsPage);
