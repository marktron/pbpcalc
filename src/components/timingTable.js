import * as React from "react";
import styled from "styled-components";
import { DateTime, Duration } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBaguette,
  faFlagSwallowtail,
} from "@fortawesome/pro-duotone-svg-icons";

const CellDistance = styled.div`
  order: 2;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
    order: 1;
    text-align: right;
  }
`;
const CellSpeed = styled.div`
  order: 3;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
    order: 2;
  }
`;
const CellElapsedTime = styled.div`
  order: 4;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
    order: 3;
    text-align: left;
  }
`;
const CellControlName = styled.div`
  order: 1;
  flex-grow: 1;
  text-align: center;
  background-color: ${(props) => props.theme.colors.blue_dark};
  color: ${(props) => props.theme.colors.white};
  border-radius: 6px 6px 0 0;
  @media ${(props) => props.theme.devices.tablet} {
    order: 4;
    text-align: left;
    background-color: transparent;
    border: none;
    color: inherit;
    border-radius: 0;
  }
`;
const CellArrivalTime = styled.div`
  order: 5;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
    text-align: right;
  }
`;

const CellTimeAtControl = styled.div`
  order: 6;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const CellDepartureTime = styled.div`
  order: 7;
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
    text-align: right;
  }
`;

const HeaderDistance = styled.div`
  text-align: right;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderSpeed = styled.div`
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderElapsed = styled.div`
  text-align: left;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderControl = styled.div`
  text-align: left;
  flex-grow: 1;
`;
const HeaderArrival = styled.div`
  text-align: right;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderControlTime = styled.div`
  text-align: center;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderDeparture = styled.div`
  text-align: right;
  @media ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;

const TimeTable = styled.div`
  width: 100%;
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
  strong {
    font-weight: 600;
  }
  tr {
    td,
    th {
      transition: background 0.2s ease, color 0.2s ease;
    }
    &:nth-child(even) {
      background: ${(props) => props.theme.colors.gray_light_translucent};
    }
    &:hover {
      td {
        color: ${(props) => props.theme.colors.blue_dark};
        background: ${(props) => props.theme.colors.blue_light_translucent};
        input {
          transition: background 0.2s ease, border-color 0.2s ease;
          background-color: ${(props) => props.theme.colors.white};
          border-color: ${(props) => props.theme.colors.gray_light};
        }
      }
    }
  }
`;
const TimeTableHeader = styled.div`
  display: none;
  @media ${(props) => props.theme.devices.tablet} {
    border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
    font-size: 90%;
    display: flex;
    flex-direction: row;
    width: 100%;
    div {
      padding: 6px 12px;
    }
  }
`;
const TimeTableRow = styled.div`
  border: solid 1px ${(props) => props.theme.colors.gray_light};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  div {
    padding: 6px 12px;
    width: 100%;
  }
  @media ${(props) => props.theme.devices.tablet} {
    flex-direction: row;
    align-items: stretch;
    border: none;
    border-radius: 0;
    margin-top: 0;
    transition: background 0.2s ease, color 0.2s ease;
    div {
      padding: 6px 12px;
      width: 10%;
    }
    &:nth-child(even) {
      background: ${(props) => props.theme.colors.gray_light_translucent};
    }
    &:hover {
      div {
        color: ${(props) => props.theme.colors.blue_dark};
        background: ${(props) => props.theme.colors.blue_light_translucent};
        input {
          transition: background 0.2s ease, border-color 0.2s ease;
          background-color: ${(props) => props.theme.colors.white};
          border-color: ${(props) => props.theme.colors.gray_light};
        }
      }
    }
  }
`;
const MobileLabel = styled.span`
  margin-right: 5px;
  @media ${(props) => props.theme.devices.tablet} {
    display: none;
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
    const controlTiming = timing.filter((r) => r.distance === row.distance);
    const customControls = timingData.filter(
      (r) => r.distance === row.distance
    );
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
      <TimeTableRow key={rowCounter}>
        {/* Distance */}
        <CellDistance>
          <MobileLabel>Distance:</MobileLabel>
          {controlTiming[0]?.distance} km
        </CellDistance>
        {/* Speed */}
        {controlTiming[0]?.distance !== timing[0].distance && (
          <CellSpeed>
            <MobileLabel>Speed (km/h):</MobileLabel>
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
          </CellSpeed>
        )}
        {/* Elapsed Time */}
        <CellElapsedTime>
          <MobileLabel>Elapsed Time:</MobileLabel>
          {rowCounter > 1
            ? Duration.fromDurationLike({
                hours: controlTiming[0]?.elapsedTime,
              }).toFormat("hh:mm")
            : "00:00"}
        </CellElapsedTime>
        {/* Control name */}
        <CellControlName>
          <FontAwesomeIcon
            icon={controlIcon(controlTiming[0]?.type)}
            fixedWidth
            swapOpacity={controlTiming[0]?.type === "FOOD" ? false : true}
            title={
              controlTiming[0]?.type === "FOOD" ? "Food only" : "Control point"
            }
          />
          <strong>{controlTiming[0]?.location}</strong>
        </CellControlName>
        {/* Arrival time */}
        {controlTiming[0]?.distance !== timing[0].distance && (
          <CellArrivalTime>
            <MobileLabel>Arrival Time:</MobileLabel>
            {arrivalTimeFormatted}
          </CellArrivalTime>
        )}
        {/* Time at control */}
        {controlTiming[0]?.distance !== timing[0].distance &&
          controlTiming[0]?.distance !== timing[timing.length - 1].distance && (
            <CellTimeAtControl>
              <MobileLabel>Time at Control:</MobileLabel>
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
            </CellTimeAtControl>
          )}
        {/* Departure time */}
        {controlTiming[0]?.distance !== timing[timing.length - 1].distance && (
          <CellDepartureTime>
            <MobileLabel>Departure Time:</MobileLabel>
            {departureTimeFormatted}
          </CellDepartureTime>
        )}
      </TimeTableRow>
    );
  };

  return (
    <>
      <TimeTable>
        <TimeTableHeader>
          <HeaderDistance>Distance</HeaderDistance>
          <HeaderSpeed>Speed</HeaderSpeed>
          <HeaderElapsed>Elapsed Time</HeaderElapsed>
          <HeaderControl>Control</HeaderControl>
          <HeaderArrival>Arrival Time</HeaderArrival>
          <HeaderControlTime>Time at Control</HeaderControlTime>
          <HeaderDeparture>Departure Time</HeaderDeparture>
        </TimeTableHeader>

        {controls.map((row) => renderRow(row))}
      </TimeTable>
    </>
  );
};

export default TimingTable;
