import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const YvipIcon = (props) => (
  <span className={`yvip-icon ${props.iconCode}`}>
    <FontAwesomeIcon icon={["fab", props.iconCode]} className="mr-3" />
  </span>
);

export default YvipIcon;
