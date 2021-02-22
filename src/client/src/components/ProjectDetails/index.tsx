import * as React from "react";

import ProjectOutput from "./ProjectOutput";
import ProjectName from "./ProjectName";

import rightsidebarStyles from "../RightSidebar/rightsidebarStyles.module.css";
import classNames from "classnames";

interface IProps {
  isRightsidebar?: boolean;
}

type Props = IProps;

const ProjectDetails = (props: Props): JSX.Element => {
  return (
    <div className={classNames({ [rightsidebarStyles.sidebarItem]: props.isRightsidebar })}>
      <ProjectName isRightsidebar={props.isRightsidebar} />
      <ProjectOutput isRightsidebar={props.isRightsidebar} />
    </div>
  );
};

export default ProjectDetails;
