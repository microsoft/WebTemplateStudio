import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { IProps, IDispatchProps, IStateProps } from "./interfaces";
import {mapDispatchToProps, mapStateToProps} from "./store";
import styles from "./styles.module.css";
import { getSvg } from "../../../utils/getSvgUrl";
import messages from "./messages";
import { Link } from "react-router-dom";
import { ROUTES, KEY_EVENTS } from "../../../utils/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { ReactComponent as Plus } from "../../../assets/plus.svg";
import { ISelected } from "../../../types/selected";
import { inferItemName } from "../../../utils/infer/itemName";


type Props = IProps & IDispatchProps & IStateProps & InjectedIntlProps;

const PageCard = (props: Props) => {
  const { page, intl, setPages, selectedPages, setDetailPage, isModal, pageOutOfBounds } = props;
  const [showPlusIcon, setShowPlusIcon] = React.useState(false);

  React.useEffect(()=>{
    if (selectedPages.length === 0 && page.defaultName === "Blank"){
      setTimeout(()=> setPages([page]),200);
    }
  },[page]);

  const addPage = ()=>{
    const select: ISelected = {
      author:page.author,
      defaultName:page.defaultName,
      internalName:page.internalName,
      isValidTitle:page.isValidTitle,
      licenses:page.licenses,
      title:inferItemName(page.defaultName,selectedPages)
    };

    if (!pageOutOfBounds){
      const newSelectedPages: ISelected[] = selectedPages.splice(0);
      newSelectedPages.push(select);
      setPages(newSelectedPages);
    }
  }

  const addPageIfEnterOrSpace = (event: React.KeyboardEvent<HTMLDivElement>) =>{
    const isSelectableCard = event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE;
    if (isSelectableCard){
      event.preventDefault();
      addPage();
    }
  }

  const showMoreInfo = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDetailPage(page);
  }

  const showDetailIfPressEnterKey = (event: React.KeyboardEvent<HTMLAnchorElement>) =>{
    event.stopPropagation();
    if (event.key === KEY_EVENTS.ENTER){
      setDetailPage(page);
    }
  }

  return (
    <div
    role="button"
    tabIndex={0}
    onKeyDown={addPageIfEnterOrSpace}
    onClick={addPage}
    className={classNames(styles.container, styles.boundingBox, {
      [styles.selected]: selectedPages.filter((selectedPage) => selectedPage.defaultName===page.defaultName).length > 0
    })}
    onFocus={()=>setShowPlusIcon(true)}
    onBlur={()=>setShowPlusIcon(false)}
    onMouseLeave={()=>setShowPlusIcon(false)}
    onMouseOver={()=>setShowPlusIcon(true)} >
    <div>
      <div className={styles.gridLayoutCardHeader}>
        <div>
        {getSvg(page.internalName, styles.icon) ||
          (page.svgUrl && (
            <img src={page.svgUrl} alt="" />
          ))}
        </div>
        <div className={classNames(styles.title)}>
          {page.defaultName}
        </div>
        {showPlusIcon && (
           <div className={classNames(styles.headerIconContainer)}>
           <Plus role="figure"/>
         </div>
        )}
      </div>
      <div className={styles.description}>
        {page.body}
      </div>
      <div className={styles.gridLayoutCardFooter}>
      <div>
          {!isModal && (
            <Link
            onClick={showMoreInfo}
            onKeyDown={showDetailIfPressEnterKey}
            className={styles.link}
            to={ROUTES.PAGE_DETAILS}>
            {intl.formatMessage(messages.Preview)}
          </Link>
          )}
        </div>
        <div className={styles.pageCounter}>
          {selectedPages.filter((selectedPage) => selectedPage.defaultName===page.defaultName).length}
        </div>
      </div>
    </div>
  </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PageCard));