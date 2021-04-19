import React from "react";
import moment from "moment";

const Session = ({
  sessionLength,
  decrementSessionLengthByOneMinute,
  incrementSessionLengthByOneMinute,
}) => {
  //Convert seconds in to minutes using moment.js
  const sessionLengthInMinutes = moment
    .duration(sessionLength, "s")
    .asMinutes();
  return (
    <div className="set-time-div" id="session-div">
      <h3 id="session-label">Session time</h3>
      <p id="session-length">{sessionLengthInMinutes}</p>
      <div>
        <button
          className="increment-decrement-button"
          onClick={decrementSessionLengthByOneMinute}
        >
          -
        </button>
        <button
          className="increment-decrement-button"
          onClick={incrementSessionLengthByOneMinute}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Session;
