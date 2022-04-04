import React from "react";
import { useLocation } from "react-router-dom";

export default function WashHeader() {
  const { state } = useLocation();
  const washDuration = state.washDuration;

  const washDurationMinutes = washDuration.substring(
    0,
    washDuration.indexOf(":").toString().padStart(2, 0)
  );

  const washDurationSeconds = washDuration.substring(
    washDuration.indexOf(":") + 1
  );

  const MinSecs = {
    minutes: washDurationMinutes,
    seconds: washDurationSeconds,
  };

  const [washDone, setWashDone] = React.useState("");
  const [hideTimer, setHideTimer] = React.useState("");

  const CountDownTimer = ({ MinSecs }) => {
    const { minutes = 0, seconds = 0 } = MinSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);

    const tick = () => {
      if (+mins === 0 && +secs === 0) {
        setTime([+mins, +secs, 0]);
        setHideTimer("hidden");
        setWashDone("Din vask er nu færdig!");
      } else if (+secs === 0) {
        setTime([+mins - 1, 59]);
      } else {
        setTime([+mins, +secs - 1]);
      }
    };

    React.useEffect(() => {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    });

    return (
      <div>
        <p>
          {`
          ${mins.toString().padStart(2, "0")}
          :
          ${secs.toString().padStart(2, "0")}
          `}
        </p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Din '{state.washName}' vask startes nu</h1>

      <table className="table">
        <tbody>
          <tr>
            <th scope="row" className="m-0 h2_small mt-3">
              Lokation
            </th>
            <td className="h2_small color_highlight">{state.washLocation}</td>
          </tr>
          <tr>
            <th scope="row" className="m-0 h2_small mt-3">
              Nummerplade
            </th>
            <td className="h2_small color_highlight">{state.LicensePlate}</td>
          </tr>
          <tr>
            <th scope="row" className="m-0 h2_small mt-3">
              Pris
            </th>
            <td className="h2_small color_highlight">
              {state.WashPrice.slice(0, -3)} DKK
            </td>
          </tr>
        </tbody>
      </table>

      <div className="timer text-center mt-5">
        {!hideTimer && <h2>Din vask er færdig om:</h2>}
        <h2 className="h2_countdown color_highlight">
          {!hideTimer && <CountDownTimer MinSecs={MinSecs} />}
          {washDone}
        </h2>
      </div>
    </div>
  );
}
