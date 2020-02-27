import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { ThunkDispatch } from "redux-thunk";

import { injectIntl, InjectedIntl } from "react-intl";

import SortableList from "../../../components/SortableSelectionList";

import { selectPagesAction } from "../../../actions/wizardSelectionActions/selectPages";
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
import { validateItemName} from "../../../utils/validations/itemName/itemName";
import { IValidations } from "../../../reducers/wizardSelectionReducers/setValidations";
import {
  getValidations
} from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
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
  selectionTitle?: string;
  handleResetPages: () => void;
  validations: IValidations;
}

interface ISortableDispatchProps {
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
    openAddPagesModal,
    validations
  } = props;
  const [pages, setPages] = React.useState(selectedPages);
  const [isMinimized, setMinimized] = React.useState(false);

  React.useEffect(() => {
    setPages(selectedPages);
    if (document.getElementById("dvRightSideBar") && document.getElementById("dvSummaryContainer")) 
      document.getElementById("dvRightSideBar")!.scrollTop= document.getElementById("dvSummaryContainer")!.offsetHeight;
  }, [selectedPages]);

  const handleInputChange = async (newTitle: string, idx: number) => {
    pages[idx].title = newTitle;
    pages[idx].error = "";
    const validationResult = await validateItemName(newTitle, validations.itemNameValidationConfig, selectedPages);
    pages[idx].error = validationResult.error;
    pages[idx].isValidTitle = validationResult.isValid;

    setPages(pages);
    props.selectPages(pages);
  };

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
    selectPages(arrayMove(pages, oldIndex, newIndex));
  };

  const handleCloseClick = (idx: number) => {
    const pagesWithOmittedIdx: ISelected[] = [...pages];
    pagesWithOmittedIdx.splice(idx, 1);
    selectPages(pagesWithOmittedIdx);
  };

  const DRAG_PIXEL_THRESHOLD = 1;

  return (
    <div>
      <div className={classnames(styles.pageListContainer, styles.sidebarItem)}>
        <div className={styles.dropdownTitle}>
          {`${props.intl!.formatMessage(messages.pages)} (${
            pages.length >= 0 ? pages.length : ""
          })`}
        </div>
        <div className={styles.iconsContainer}>
          {isSummaryPage && (
            <button
              className={styles.addPagesButton}
              onClick={handleOpenAddPagesModal}
            >
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
            {isMinimized ? (
              <ShowIcon className={styles.viewIcon} />
            ) : (
              <HideIcon className={styles.viewIcon} />
            )}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <SortableList
          pages={selectedPages}
          maxInputLength={PAGE_NAME_CHARACTER_LIMIT}
          onSortEnd={onSortEnd}
          distance={DRAG_PIXEL_THRESHOLD}
          handleInputChange={handleInputChange}
          handleCloseClick={handleCloseClick}
          lockToContainerEdges
          lockAxis='y'
          lockOffset='25%'
        />
      )}
      {/* Using a baseline of 1 for idx because !!0 === false */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.selection.pages,
  validations: getValidations(state),
  vscode: getVSCodeApiSelector(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): ISortableDispatchProps => ({
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
