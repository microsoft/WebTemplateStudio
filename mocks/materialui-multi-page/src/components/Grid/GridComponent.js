import React from "react";

export default function GridComponent(props) {
  return (
    <div className="col-4 p-5">
      <img src={props.image} alt="Default Grey Box" className="mb-3" />
      <h3>{props.header}</h3>
      <p>{props.description}</p>
    </div>
  );
}
