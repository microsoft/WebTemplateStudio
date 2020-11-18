import React from "react";
import ImgGreyBox from "../../images/GreyBox.svg"
import PropTypes from "prop-types";

const GridItem = ({ item }) => {
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src={ImgGreyBox} alt="Default Grey Box" className="mb-3" />
      <h3>{item.header}</h3>
      <p>{item.shortDescription}</p>
    </div>
  );
}

GridItem.propTypes = {
  item: PropTypes.any
}

export default GridItem;