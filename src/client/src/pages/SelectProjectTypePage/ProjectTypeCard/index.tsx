import classNames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";

import { ReactComponent as Check } from "../../../assets/check.svg";
import Icon from "../../../components/Icon";
import buttonStyles from "../../../css/button.module.css";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { setSelectedProjectTypeAction } from "../../../store/userSelection/projectType/action";
import { KEY_EVENTS, ROUTE } from "../../../utils/constants/constants";
import cardStyles from "../../cardStyles.module.css";
import messages from "../../messages";
import { ISelectProps, IStateProps } from "./interfaces";
import { mapStateToProps } from "./store";

type Props = ISelectProps & IStateProps & InjectedIntlProps;

const ProjectTypeCard = (props: Props) => {
  const { projectType, projectTypeSelect, intl } = props;

  const [selected, setSelected] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setSelected(projectTypeSelect.internalName === projectType.internalName);
  }, [projectTypeSelect]);

  const selectCard = () => {
    dispatch(setSelectedProjectTypeAction(projectType));
  };

  const selectCardIfEnterOrSpace = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isSelectableCard = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isSelectableCard) {
      event.preventDefault();
      selectCard();
    }
  };

  const showMoreInfo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    dispatch(setDetailPageAction(projectType, false, ROUTE.ADD_PAGES));
  };

  const showMoreInfoIfEnterOrSpace = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const isPressed = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isPressed) {
      event.preventDefault();
      showMoreInfo(event);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectCard}
      onKeyDown={selectCardIfEnterOrSpace}
      className={classNames(cardStyles.container, cardStyles.boundingBox, {
        [cardStyles.selected]: selected,
      })}
    >
      <div className={cardStyles.gridLayoutCardHeader}>
        <div>{projectType.title && <Icon name={projectType.title} icon={projectType.icon} />}</div>
        <div className={cardStyles.title}>{projectType.title}</div>
      </div>
      <div>{projectType.body}</div>
      <div className={cardStyles.gridLayoutCardFooter}>
        <div>
          <button
            onClick={showMoreInfo}
            onKeyDown={showMoreInfoIfEnterOrSpace}
            className={buttonStyles.buttonLink}
            tabIndex={0}
          >
            {intl.formatMessage(messages.Preview)}
          </button>
        </div>
        {selected && <Check role="figure" className={cardStyles.iconCheckMark} />}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(ProjectTypeCard));
