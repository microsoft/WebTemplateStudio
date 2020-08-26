import classnames from "classnames";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { injectIntl, InjectedIntl } from "react-intl";
import PageContainer from "./PageContainer";

import { ReactComponent as ShowIcon } from "../../../assets/i-show.svg";
import { ReactComponent as HideIcon } from "../../../assets/i-hide.svg";

import styles from "./styles.module.css";
import { AppState } from "../../../store/combineReducers";

import { PAGE_NAME_CHARACTER_LIMIT } from "../../../utils/constants/constants";
import messages from "./messages";
import { setPagesAction } from "../../../store/userSelection/pages/action";

interface IStateProps {
  pathname: string;
}

interface IIntlProps {
  intl?: InjectedIntl;
}

type Props = IStateProps & IIntlProps;

const SelectPages = (props: Props) => {
  const [isMinimized, setMinimized] = React.useState(false);
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
      <div>
      <div className={classnames(styles.pageListContainer, styles.sidebarItem)}>
        <div className={styles.dropdownTitle}>
          {`${props.intl!.formatMessage(messages.pages)} (${
            selectedPages.length >= 0 ? selectedPages.length : ""
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
              <ShowIcon className={styles.viewIcon} />
            ) : (
              <HideIcon className={styles.viewIcon} />
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
    </div>
  );
};

export default injectIntl(SelectPages);