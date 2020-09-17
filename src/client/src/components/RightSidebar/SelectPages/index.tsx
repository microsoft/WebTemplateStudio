import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { injectIntl, InjectedIntl } from "react-intl";

import { PAGE_NAME_CHARACTER_LIMIT } from "../../../utils/constants/constants";

import { AppState } from "../../../store/combineReducers";
import { setPagesAction } from "../../../store/userSelection/pages/action";

import PageContainer from "./PageContainer";

import messages from "./messages";
import classnames from "classnames";
import rightsidebarStyles from "../rightsidebarStyles.module.css";
import styles from "./styles.module.css";

import { ReactComponent as ShowIconSVG } from "../../../assets/i-show.svg";
import { ReactComponent as HideIconSVG } from "../../../assets/i-hide.svg";

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

  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    dispatch(setPagesAction(arrayMove(selectedPages, oldIndex, newIndex)));
  };
  const DRAG_PIXEL_THRESHOLD = 1;

  return (
    <div className={styles.sortablePages}>
      <div className={classnames(styles.pageListContainer)}>
        <div className={rightsidebarStyles.dropdownTitle}>
          {`${props.intl!.formatMessage(messages.pages)} (${selectedPages.length >= 0 ? selectedPages.length : ""
            })`}
        </div>
        <div className={styles.iconsContainer}>
          <button
            className={styles.hideOrShow}
            onClick={() => {
              setMinimized(!isMinimized);
            }}
          >
            {isMinimized ? (
              <ShowIconSVG className={styles.viewIcon} />
            ) : (
                <HideIconSVG className={styles.viewIcon} />
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
          lockAxis='y'
          lockOffset='25%'
        />
      )}
    </div>
  );
};

export default injectIntl(SelectPages);