import classNames from "classnames";
import * as React from "react";

import rightsidebarStyles from "../RightSidebar/rightsidebarStyles.module.css";
import ProjectName from "./ProjectName";
import ProjectOutput from "./ProjectOutput";

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
