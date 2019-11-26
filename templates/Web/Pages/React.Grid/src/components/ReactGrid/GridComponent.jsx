import React from "react";

export default function GridComponent({ griItem }) {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src="@/assets/GreyBox.svg" alt="Default Grey Box" className="mb-3" />
      <h3>{griItem.header}</h3>
      <p>{griItem.shortDescription}</p>
    </div>
  );
}
