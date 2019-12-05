import React from "react";
import ImgGreyBox from "../../images/GreyBox.svg"

export default function GridComponent({ gridItem }) {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src={ImgGreyBox} alt="Default Grey Box" className="mb-3" />
      <h3>{gridItem.header}</h3>
      <p>{gridItem.shortDescription}</p>
    </div>
  );
}
