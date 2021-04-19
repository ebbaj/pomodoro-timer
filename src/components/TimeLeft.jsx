import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import React from "react";
import "../styles/TimeLeft.scss";

momentDurationFormatSetup(moment);

const TimeLeft = ({
  timerLabel,
  handleStartStopClick,
  startStopButtonLabel,
  timeLeft,
}) => {
  //Format time left (mm:ss)
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });
  return (
    <div className="TimeLeft">
      <h2 id="time-label">{timerLabel}</h2>
      <p id="time-left">{formattedTimeLeft}</p>

      <button id="startStopButton" onClick={handleStartStopClick}>
        {" "}
        {startStopButtonLabel}
      </button>
    </div>
  );
};

export default TimeLeft;
