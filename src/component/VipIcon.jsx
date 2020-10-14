import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VipIcon = (props) => (
  <div href={props.link} className={`d-inline-block yvip-icon ${props.iconCode} ${props.className}`} >
    <a href={props.link} target="_blank">
      <FontAwesomeIcon icon={["fab", props.iconCode]} className="mr-3" />
    </a>
  </div>
);

export default VipIcon;
