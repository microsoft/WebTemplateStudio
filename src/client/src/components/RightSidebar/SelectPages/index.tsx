import classnames from "classnames";
import React, { useState } from "react";
import { InjectedIntl, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { ReactComponent as HideIconSVG } from "../../../assets/i-hide.svg";
import { ReactComponent as ShowIconSVG } from "../../../assets/i-show.svg";
import { AppState } from "../../../store/combineReducers";
import { setPagesAction } from "../../../store/userSelection/pages/action";
import { PAGE_NAME_CHARACTER_LIMIT } from "../../../utils/constants/constants";
import InputTitle from "../../Titles/TitleForInput";
import rightsidebarStyles from "../rightsidebarStyles.module.css";
import messages from "./messages";
import PageContainer from "./PageContainer";
import styles from "./styles.module.css";

interface IStateProps {
  pathname: string;
}

interface IIntlProps {
  intl?: InjectedIntl;
}

type Props = IStateProps & IIntlProps;

const SelectPages = (props: Props) => {
  const [isMinimized, setMinimized] = useState(false);
  const selectedPages: any[] = useSelector((state: AppState) => state.userSelection.pages);
  const dispatch = useDispatch();

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    dispatch(setPagesAction(arrayMove(selectedPages, oldIndex, newIndex)));
  };
  const DRAG_PIXEL_THRESHOLD = 1;
  const MAX_PAGES_ALLOWED = 20;

  return (
    <div className={rightsidebarStyles.sidebarItem}>
      <div className={classnames(styles.pageListContainer)}>
        <InputTitle>
          {`${props.intl!.formatMessage(messages.pages)} (${
            selectedPages.length >= 0 ? selectedPages.length : ""
          }/${MAX_PAGES_ALLOWED})`}
        </InputTitle>
        <div className={styles.iconsContainer}>
          <button
            className={styles.hideOrShow}
            onClick={() => {
              setMinimized(!isMinimized);
            }}
          >
            {isMinimized ? (
              <ShowIconSVG
                className={styles.viewIcon}
                aria-label={props.intl!.formatMessage(messages.showAriaLabel)}
                title={props.intl!.formatMessage(messages.showIcon)}
              />
            ) : (
              <HideIconSVG
                className={styles.viewIcon}
                aria-label={props.intl!.formatMessage(messages.hideAriaLabel)}
                title={props.intl!.formatMessage(messages.hideIcon)}
              />
            )}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <PageContainer
          pages={selectedPages}
          maxInputLength={PAGE_NAME_CHARACTER_LIMIT}
          onSortEnd={onSortEnd}
          distance={DRAG_PIXEL_THRESHOLD}
          lockToContainerEdges
          lockAxis="y"
          lockOffset="25%"
        />
      )}
    </div>
  );
};

export default injectIntl(SelectPages);
