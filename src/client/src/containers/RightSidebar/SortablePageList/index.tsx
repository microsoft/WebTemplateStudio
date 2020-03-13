import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { ThunkDispatch } from "redux-thunk";

import { injectIntl, InjectedIntl } from "react-intl";

import SortableContainerPage from "./SortableContainerAndElementPage";

import { selectPageAction, selectPagesAction } from "../../../actions/wizardSelectionActions/selectPages";
import * as ModalActions from "../../../actions/modalActions/modalActions";

import { ISelected } from "../../../types/selected";

import { ReactComponent as ShowIcon } from "../../../assets/i-show.svg";
import { ReactComponent as HideIcon } from "../../../assets/i-hide.svg";
import { ReactComponent as ResetIcon } from "../../../assets/i-reset.svg";
import { ReactComponent as Plus } from "../../../assets/plus.svg";

import styles from "./styles.module.css";
import { AppState } from "../../../reducers";
import RootAction from "../../../actions/ActionType";

import { PAGE_NAME_CHARACTER_LIMIT, EXTENSION_COMMANDS } from "../../../utils/constants";
import messages from "./messages";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { sendTelemetry } from "../../../utils/extensionService/extensionService";

interface ISortablePageListProps {
  vscode: IVSCodeObject;
  selectedPages: any[];
}

interface IStateProps {
  isSummaryPage?: boolean;
  handleResetPages: () => void;
}

interface ISortableDispatchProps {
  updatePage: (page: ISelected) => any;
  selectPages: (pages: ISelected[]) => any;
  openAddPagesModal: () => any;
}

interface IIntlProps {
  intl?: InjectedIntl;
}

type Props = ISortablePageListProps &
  ISortableDispatchProps &
  IStateProps &
  IIntlProps;

const SortablePageList = (props: Props) => {
  const {
    vscode,
    selectedPages,
    selectPages,
    isSummaryPage,
    openAddPagesModal
  } = props;
  const [isMinimized, setMinimized] = React.useState(false);

  const moveScroolDown = () =>{
    if (document.getElementById("dvRightSideBar") && document.getElementById("dvSummaryContainer")) 
    document.getElementById("dvRightSideBar")!.scrollTop= document.getElementById("dvSummaryContainer")!.offsetHeight;
  }

  const handleOpenAddPagesModal = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_ADD_PAGES_MODAL);
    openAddPagesModal();
  }
  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    selectPages(arrayMove(selectedPages, oldIndex, newIndex));
  };
  const DRAG_PIXEL_THRESHOLD = 1;
  return (
    <div>
      <div className={classnames(styles.pageListContainer, styles.sidebarItem)}>
        <div className={styles.dropdownTitle}>
          {`${props.intl!.formatMessage(messages.pages)} (${
            selectedPages.length >= 0 ? selectedPages.length : ""
          })`}
        </div>
        <div className={styles.iconsContainer}>
          {isSummaryPage && (
            <button
              className={styles.addPagesButton}
              onClick={handleOpenAddPagesModal}>
              <Plus className={styles.plusIcon} />
            </button>
          )}
          <button
            className={styles.resetButton}
            onClick={props.handleResetPages}
          >
            <ResetIcon className={styles.viewIcon} />
          </button>
          <button
            className={styles.hideOrShow}
            onClick={() => {
              setMinimized(!isMinimized);
            }}
          >
            {isMinimized && (
              <ShowIcon className={styles.viewIcon} />
            )}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <SortableContainerPage
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

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.selection.pages,
  vscode: getVSCodeApiSelector(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): ISortableDispatchProps => ({
  updatePage: (page: ISelected) => {
    dispatch(selectPageAction(page));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  openAddPagesModal: () => {
    dispatch(ModalActions.openAddPagesModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SortablePageList));
