import classnames from "classnames";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { injectIntl, InjectedIntl } from "react-intl";
import PageContainer from "./PageContainer";

import { selectPagesAction, resetPagesAction } from "../../../actions/wizardSelectionActions/selectPages";
import * as ModalActions from "../../../actions/modalActions/modalActions";
import { ISelected } from "../../../types/selected";

import { ReactComponent as ShowIcon } from "../../../assets/i-show.svg";
import { ReactComponent as HideIcon } from "../../../assets/i-hide.svg";
import { ReactComponent as ResetIcon } from "../../../assets/i-reset.svg";
import { ReactComponent as Plus } from "../../../assets/plus.svg";

import styles from "./styles.module.css";
import { AppState } from "../../../reducers";

import { PAGE_NAME_CHARACTER_LIMIT, EXTENSION_COMMANDS, BOOTSTRAP_LICENSE, ROUTES } from "../../../utils/constants";
import messages from "./messages";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { sendTelemetry, resetAllPages } from "../../../utils/extensionService/extensionService";
import { SelectionState } from "../../../reducers/wizardSelectionReducers";

interface IStateProps {
  pathname: string;
}

interface IIntlProps {
  intl?: InjectedIntl;
}

type Props = IStateProps & IIntlProps;

const SelectPages = (props: Props) => {
  const {
    pathname
  } = props;
  const [isMinimized, setMinimized] = React.useState(false);

  const selection: SelectionState = useSelector((state: AppState) => state.selection);
  const selectedPages: any[] = useSelector((state: AppState) => state.selection.pages);
  const vscode: IVSCodeObject = useSelector((state: AppState) => getVSCodeApiSelector(state));
  const dispatch = useDispatch();

  const handleOpenAddPagesModal = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_ADD_PAGES_MODAL);
    dispatch(ModalActions.openAddPagesModalAction());
  }

  const resetAllPagesEvent = () => {
    const { pages, frontendFramework } = selection;
    resetAllPages(vscode, frontendFramework.internalName, pages.length).then(()=>{
      dispatch(resetPagesAction());
      const PAGES_SELECTION: ISelected[] = [
        {
          title: "Blank",
          internalName: `wts.Page.${frontendFramework.internalName}.Blank`,
          id: "Blank",
          defaultName: "Blank",
          isValidTitle: true,
          licenses: [
            {
              text: "Bootstrap",
              url: BOOTSTRAP_LICENSE
            }
          ],
          author: "Microsoft"
        }
      ];
      dispatch(selectPagesAction(PAGES_SELECTION));
    });
  };

  const isSummaryPage= pathname === ROUTES.REVIEW_AND_GENERATE;

  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    dispatch(selectPagesAction(arrayMove(selectedPages, oldIndex, newIndex)));
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
          {isSummaryPage && (
            <button
              className={styles.addPagesButton}
              onClick={handleOpenAddPagesModal}>
              <Plus className={styles.plusIcon} />
            </button>
          )}
          <button
            data-testid="btnResetPages"
            className={styles.resetButton}
            onClick={resetAllPagesEvent}
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