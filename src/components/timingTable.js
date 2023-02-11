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
const HeaderRightAlign = styled.th`
  text-align: right;
`;
const HeaderLeftAlign = styled.th`
  text-align: left;
`;
const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  svg {
    margin-right: 6px;
  }
  input {
    border: solid 1px transparent;
    border-radius: 5px;
    padding: 2px;
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
  const { timing, controls, startTime } = props;
  let rowCounter = 0;
  let displayDate = null;

  const updateControlInfo = (i, value, type) => {
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
    return true;
  };

  const renderRow = (row) => {
    const controlTiming = timing.filter((r) => r.distance == row.distance);
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
        arrivalTimeFormatted = arrivalTime.toLocaleString(
          DateTime.DATETIME_MED
        );
      } else if (
        arrivalTime.toLocaleString(DateTime.DATE_MED) === displayDate
      ) {
        arrivalTimeFormatted = arrivalTime.toLocaleString(DateTime.TIME_SIMPLE);
      }
      displayDate = arrivalTime.toLocaleString(DateTime.DATE_MED);
    }
    const departureDuration = Duration.fromObject({
      hours: controlTiming[1]?.elapsedTime,
    });

    if (rowCounter < controls.length - 1) {
      departureTime = startTime.plus(departureDuration);
      if (departureTime.toLocaleString(DateTime.DATE_MED) !== displayDate) {
        departureTimeFormatted = departureTime.toLocaleString(
          DateTime.DATETIME_MED
        );
      } else if (
        departureTime.toLocaleString(DateTime.DATE_MED) === displayDate
      ) {
        departureTimeFormatted = departureTime.toLocaleString(
          DateTime.TIME_SIMPLE
        );
      }
      displayDate = departureTime.toLocaleString(DateTime.DATE_MED);
    }
    rowCounter++;
    return (
      <tr key={rowCounter}>
        <CellRightAlign>{controlTiming[0]?.distance} km</CellRightAlign>
        <CellRightAlign>
          <input
            type="number"
            id={"speedPicker_" + rowCounter}
            name={"speedPicker_" + rowCounter}
            min="10"
            max="40"
            value={row.speedToControl ? row.speedToControl : props.avgSpeed}
            // onChange={(e) =>
            //   updateControlInfo(rowCounter, e.target.value, "SPEED")
            // }
          />
        </CellRightAlign>
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
        <CellRightAlign>45</CellRightAlign>
        <CellRightAlign>{departureTimeFormatted}</CellRightAlign>
      </tr>
    );
  };

  return (
    <>
      <TimeTable>
        <thead>
          <tr>
            <HeaderRightAlign>Distance</HeaderRightAlign>
            <HeaderRightAlign>Speed</HeaderRightAlign>
            <HeaderLeftAlign>Elapsed Time</HeaderLeftAlign>
            <HeaderLeftAlign>Control</HeaderLeftAlign>
            <HeaderRightAlign>Arrival Time</HeaderRightAlign>
            <HeaderRightAlign>Time at Control</HeaderRightAlign>
            <HeaderRightAlign>Departure Time</HeaderRightAlign>
          </tr>
        </thead>
        <tbody>{controls.map((row) => renderRow(row))}</tbody>
      </TimeTable>
    </>
  );
};

export default TimingTable;
