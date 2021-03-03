import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import ModalContent from "../../components/ModalContent";
import { AppState } from "../../store/combineReducers";
import { isViewLicensesModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import Licenses from "./Licenses";
import messages from "./messages";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const ViewLicensesModal = ({ intl }: Props) => {
  return (
    <ModalContent title={intl.formatMessage(messages.licenses)}>
      <Licenses />
    </ModalContent>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isViewLicensesModalOpenSelector(state),
});

export default connect(mapStateToProps)(
  asModal(injectIntl(ViewLicensesModal), NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL)
);
