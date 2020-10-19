import * as React from "react";

import ProjectOutput from "./ProjectOutput";
import ProjectName from "./ProjectName";

interface IProps {
  rightsidebar?: boolean;
}

type Props = IProps;

const ProjectDetails = (props: Props) => {
  return (
    <>
      <ProjectName rightsidebar={props.rightsidebar} />
      <ProjectOutput rightsidebar={props.rightsidebar} />
    </>
  );
};

export default ProjectDetails;
