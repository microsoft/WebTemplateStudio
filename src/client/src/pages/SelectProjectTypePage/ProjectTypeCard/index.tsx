import classNames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { ISelectProps, IStateProps } from "./interfaces";
import { setSelectedProjectTypeAction } from "../../../store/userSelection/projectType/action";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";

import { ReactComponent as Check } from "../../../assets/check.svg";
import Icon from "../../../components/Icon";
import { KEY_EVENTS, ROUTE } from "../../../utils/constants/constants";
import { IOption } from "../../../types/option";
import { mapStateToProps } from "./store";

import messages from "./messages";
import cardStyles from "../../cardStyles.module.css";
import pageStyles from "../../cardStyles.module.css";

type Props = ISelectProps & IStateProps & InjectedIntlProps;

const ProjectTypeCard = (props: Props) => {
  const { projectType, projectTypeSelect, intl } = props;

  const [selected, setSelected] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setSelected(projectTypeSelect === projectType);
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

  // const setDetailPage = (detailPageInfo: IOption) => {
  //   dispatch(setDetailPageAction(detailPageInfo, false, ROUTE.SELECT_FRAMEWORKS));
  // };

  // const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
  //   event.stopPropagation();
  //   if (event.key === KEY_EVENTS.ENTER) {
  //     setDetailPage(projectType);
  //   }
  // };

  // const detailsClickWrapper = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   event.stopPropagation();
  //   setDetailPage(projectType);
  // };

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
      <div>
        <div className={cardStyles.gridLayoutCardHeader}>
          <div>{projectType.title && <Icon name={projectType.title} icon={projectType.icon} />}</div>
          <div className={classNames(cardStyles.title)}>{projectType.title}</div>
        </div>
        <div className={pageStyles.description}>{projectType.body}</div>
        <div className={cardStyles.gridLayoutCardFooter}>
          <div>
            <a className={cardStyles.link} tabIndex={0}>
              {intl.formatMessage(messages.Preview)}
            </a>
          </div>
          {selected && <Check role="figure" className={cardStyles.iconCheckMark} />}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(injectIntl(ProjectTypeCard));
