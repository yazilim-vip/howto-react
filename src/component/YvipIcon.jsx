import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YvipIcon = (props) => (
  <div className={`d-inline-block yvip-icon ${props.iconCode} ${props.className}`}>
    <a href={props.link} rel="noopener noreferrer" target="_blank">
      <FontAwesomeIcon icon={["fab", props.iconCode]} className="mr-3" />
    </a >
  </div>
);

export default YvipIcon;
