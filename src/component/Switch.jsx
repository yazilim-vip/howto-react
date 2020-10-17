import React from "react";
import "../style/Switch.css";
import { actionCreators } from "../redux/actions";
import { connect } from "react-redux";

const Switch = ({
  isToggleOn,
  onToggle
}) => {

  return (
    <>
      <input
        checked={isToggleOn}
        onChange={() => onToggle()}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />

      <label
        style={{ background: isToggleOn && "#06D6A0" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

const mapStateToProps = (state) => {
  const howtoReducer = state.howtoReducer;

  return {
    isToggleOn: howtoReducer.isToggleOn
  };
};

const mapDispatchToProps = { ...actionCreators };

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
