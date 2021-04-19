import moment from "moment";
import React from "react";

const Break = ({
  breakLength,
  decrementBreakLengthByOneMinute,
  incrementBreakLengthByOneMinute,
}) => {
  //Convert seconds in to minutes using moment.js
  const breakLengthInMinutes = moment.duration(breakLength, "s").minutes();
  return (
    <div className="set-time-div" id="break-div">
      <h3 id="break-label">Break time</h3>
      <p id="break-length">{breakLengthInMinutes}</p>
      <div>
        <button
          className="increment-decrement-button"
          onClick={decrementBreakLengthByOneMinute}
        >
          -
        </button>
        <button
          className="increment-decrement-button"
          onClick={incrementBreakLengthByOneMinute}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Break;
