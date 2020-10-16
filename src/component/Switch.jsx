import React from "react";
import "../style/Switch.css";
import { actionCreators } from "../redux/actions";
import { connect } from "react-redux";

const Switch = ({ isToggleOn, onToggle, color }) => {
  return (
    <>
      <input
        checked={isToggleOn}
        onChange={onToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />

      <label
        style={{ background: isToggleOn && color }}
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
    isToggleOn: howtoReducer.isToggleOn,
  };
};

const mapDispatchToProps = { ...actionCreators.onToggle };

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
