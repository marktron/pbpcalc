import * as React from "react";
import styled from "styled-components";
import { DateTime, Duration } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBaguette,
  faFlagSwallowtail,
} from "@fortawesome/pro-duotone-svg-icons";
const CellRightAlign = styled.td`
  text-align: right;
`;
const CellLeftAlign = styled.td`
  text-align: left;
`;
const CellCenterAlign = styled.td`
  text-align: center;
`;
const HeaderDistance = styled.th`
  width: 10%;
  text-align: right;
`;
const HeaderSpeed = styled.th`
  width: 10%;
  text-align: center;
`;
const HeaderElapsed = styled.th`
  text-align: left;
  width: 10%;
`;
const HeaderControl = styled.th`
  text-align: left;
`;
const HeaderArrival = styled.th`
  text-align: right;
  width: 10%;
`;
const HeaderControlTime = styled.th`
  width: 10%;
  text-align: center;
`;
const HeaderDeparture = styled.th`
  text-align: right;
  width: 10%;
`;

const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  svg {
    margin-right: 6px;
  }
  input {
    border: solid 1px ${(props) => props.theme.colors.gray_med_translucent};
    border-radius: 5px;
    padding: 2px;
    background-color: ${(props) => props.theme.colors.gray_light_translucent};
    width: 50%;
    color: ${(props) => props.theme.colors.gray_med};
    outline: none;
    appearance: none;
    transition: border 0.2s ease;
    &:focus {
      border-color: ${(props) => props.theme.colors.gray_light};
    }
  }
  tr {
    th {
      border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
      font-size: 90%;
    }
    td,
    th {
      padding: 6px 12px;
      transition: background 0.2s ease, color 0.2s ease;
      strong {
        font-weight: 600;
      }
    }
    &:nth-child(even) {
      background: ${(props) => props.theme.colors.gray_light_translucent};
    }
    &:hover {
      td {
        color: ${(props) => props.theme.colors.blue_dark};
        background: ${(props) => props.theme.colors.blue_dark_translucent};
        input {
          transition: background 0.2s ease, border-color 0.2s ease;
          background-color: ${(props) => props.theme.colors.white};
          border-color: ${(props) => props.theme.colors.gray_light};
        }
      }
    }
  }
`;

const controlIcon = (type) => {
  switch (type) {
    case "START":
    case "END":
      return faFlagSwallowtail;
    case "FOOD":
      return faBaguette;
    default:
      return faLocationDot;
  }
};

const TimingTable = (props) => {
  const { timing, timingData, controls, startTime } = props;
  let rowCounter = 0;
  let displayDate = null;

  const updateControlInfo = (distance, value, type) => {
    const i = timingData.findIndex((x) => x.distance === distance);
    if (i > -1) {
      let newTimingData = [...props.timingData];
      switch (type) {
        case "SPEED":
          newTimingData[i].speedToControl = value;
          break;
        case "TIME":
          newTimingData[i].timeAtControl = value;
          break;
        default:
          break;
      }
      props.setTimingData(newTimingData);
      return false;
    } else {
      return false;
    }
  };

  const renderRow = (row) => {
    // Really should have made a less dumb data structure here :/
    const controlTiming = timing.filter((r) => r.distance == row.distance);
    const customControls = timingData.filter((r) => r.distance == row.distance);
    const arrivalDuration = Duration.fromObject({
      hours: controlTiming[0]?.elapsedTime,
    });
    let arrivalTime = null;
    let arrivalTimeFormatted = null;
    let departureTime = null;
    let departureTimeFormatted = null;
    if (rowCounter > 0) {
      arrivalTime = rowCounter > 0 ? startTime.plus(arrivalDuration) : null;
      if (arrivalTime.toLocaleString(DateTime.DATE_MED) !== displayDate) {
        arrivalTimeFormatted = arrivalTime.toFormat("ccc T");
      } else if (
        arrivalTime.toLocaleString(DateTime.DATE_MED) === displayDate
      ) {
        arrivalTimeFormatted = arrivalTime.toFormat("T");
      }
      displayDate = arrivalTime.toLocaleString(DateTime.DATE_MED);
    }
    const departureDuration = Duration.fromObject({
      hours: controlTiming[1]?.elapsedTime,
    });

    if (rowCounter < controls.length - 1) {
      departureTime = startTime.plus(departureDuration);
      if (departureTime.toLocaleString(DateTime.DATE_MED) !== displayDate) {
        departureTimeFormatted = departureTime.toFormat("ccc T");
      } else if (
        departureTime.toLocaleString(DateTime.DATE_MED) === displayDate
      ) {
        departureTimeFormatted = departureTime.toFormat("T");
      }
      displayDate = departureTime.toLocaleString(DateTime.DATE_MED);
    }
    rowCounter++;
    return (
      <tr key={rowCounter}>
        <CellRightAlign>{controlTiming[0]?.distance} km</CellRightAlign>
        <CellCenterAlign>
          {controlTiming[0]?.distance !== timing[0].distance && (
            <input
              type="number"
              id={"speedPicker_" + rowCounter}
              name={"speedPicker_" + rowCounter}
              min="10"
              max="40"
              value={
                customControls[0]?.speedToControl
                  ? customControls[0]?.speedToControl
                  : props.avgSpeed
              }
              onChange={(e) =>
                updateControlInfo(
                  customControls[0]?.distance,
                  e.target.value,
                  "SPEED"
                )
              }
            />
          )}
        </CellCenterAlign>
        <CellLeftAlign>
          {rowCounter > 1
            ? Duration.fromDurationLike({
                hours: controlTiming[0]?.elapsedTime,
              }).toFormat("hh:mm")
            : "00:00"}
        </CellLeftAlign>
        <CellLeftAlign>
          <FontAwesomeIcon
            icon={controlIcon(controlTiming[0]?.type)}
            fixedWidth
            swapOpacity={controlTiming[0]?.type === "FOOD" ? false : true}
          />
          <strong>{controlTiming[0]?.location}</strong>
        </CellLeftAlign>
        <CellRightAlign>{arrivalTimeFormatted}</CellRightAlign>
        <CellCenterAlign>
          {controlTiming[0]?.distance !== timing[0].distance &&
            controlTiming[0]?.distance !==
              timing[timing.length -1].distance &&(
                <input
                  type="number"
                  id={"ctrlTimePicker_" + rowCounter}
                  name={"ctrlTimePicker_" + rowCounter}
                  min="0"
                  max="10"
                  step="0.25"
                  value={
                    customControls[0]?.timeAtControl
                      ? customControls[0]?.timeAtControl
                      : props.avgCtrlTime
                  }
                  onChange={(e) =>
                    updateControlInfo(
                      customControls[0]?.distance,
                      e.target.value,
                      "TIME"
                    )
                  }
                />
              )}
        </CellCenterAlign>
        <CellRightAlign>{departureTimeFormatted}</CellRightAlign>
      </tr>
    );
  };

  return (
    <>
      <TimeTable>
        <thead>
          <tr>
            <HeaderDistance>Distance</HeaderDistance>
            <HeaderSpeed>Speed</HeaderSpeed>
            <HeaderElapsed>Elapsed Time</HeaderElapsed>
            <HeaderControl>Control</HeaderControl>
            <HeaderArrival>Arrival Time</HeaderArrival>
            <HeaderControlTime>Time at Control</HeaderControlTime>
            <HeaderDeparture>Departure Time</HeaderDeparture>
          </tr>
        </thead>
        <tbody>{controls.map((row) => renderRow(row))}</tbody>
      </TimeTable>
    </>
  );
};

export default TimingTable;
