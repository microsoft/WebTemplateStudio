import React from "react";
import ImgGreyBox from "../../images/GreyBox.svg"

export default function GridComponent({ griItem }) {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src={ImgGreyBox} alt="Default Grey Box" className="mb-3" />
      <h3>{griItem.header}</h3>
      <p>{griItem.shortDescription}</p>
    </div>
  );
}
