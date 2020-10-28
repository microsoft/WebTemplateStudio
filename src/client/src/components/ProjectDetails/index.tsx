import * as React from "react";

import ProjectOutput from "./ProjectOutput";
import ProjectName from "./ProjectName";

interface IProps {
  isRightsidebar?: boolean;
}

type Props = IProps;

const ProjectDetails = (props: Props) => {
  return (
    <>
      <ProjectName isRightsidebar={props.isRightsidebar} />
      <ProjectOutput isRightsidebar={props.isRightsidebar} />
    </>
  );
};

export default ProjectDetails;
