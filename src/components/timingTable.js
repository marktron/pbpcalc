import * as React from "react";
import styled from "styled-components";
import { DateTime, Duration } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBaguette,
  faFlagSwallowtail,
  faMoon,
} from "@fortawesome/pro-duotone-svg-icons";

const TimingCell = styled.div`
  text-align: center;
  &:empty {
    display: none;
  }
  @media print, ${(props) => props.theme.devices.tablet} {
    width: 10%;
    &:before {
      content: none !important;
    }
    &:empty {
      display: block !important;
    }
  }
`;
const TimingCellLeft = styled(TimingCell)`
  @media print, ${(props) => props.theme.devices.tablet} {
    text-align: left;
  }
`;
const TimingCellCenter = styled(TimingCell)`
  @media print, ${(props) => props.theme.devices.tablet} {
    text-align: center;
  }
`;
const TimingCellRight = styled(TimingCell)`
  @media print, ${(props) => props.theme.devices.tablet} {
    text-align: right;
  }
`;
const CellDistance = styled(TimingCellRight)`
  order: 2;
  &:before {
    content: "Distance: ";
  }
  @media print, ${(props) => props.theme.devices.tablet} {
    order: 1;
  }
`;
const CellSpeed = styled(TimingCellCenter)`
  order: 3;
  &:before {
    content: "Speed (km/h): ";
  }
  @media print, ${(props) => props.theme.devices.tablet} {
    order: 2;
  }
`;
const CellElapsedTime = styled(TimingCellLeft)`
  order: 4;
  &:before {
    content: "Elapsed Time: ";
  }
  @media print, ${(props) => props.theme.devices.tablet} {
    order: 3;
  }
`;
const CellControlName = styled(TimingCellLeft)`
  order: 1;
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.blue_dark};
  color: ${(props) => props.theme.colors.white};
  border-radius: 6px 6px 0 0;
  @media print, ${(props) => props.theme.devices.tablet} {
    order: 4;
    background-color: transparent;
    border: none;
    color: inherit;
    border-radius: 0;
  }
`;
const CellArrivalTime = styled(TimingCellRight)`
  order: 5;
  &:before {
    content: "Arrival Time: ";
  }
`;
const CellTimeAtControl = styled(TimingCellCenter)`
  order: 6;
  &:before {
    content: "Hours at Control: ";
  }
  @media print, ${(props) => props.theme.devices.tablet} {
    width: 12% !important;
  }
`;
const CellDepartureTime = styled(TimingCellRight)`
  order: 7;
  &:before {
    content: "Departure Time: ";
  }
`;
const HeaderCell = styled.div`
  @media print, ${(props) => props.theme.devices.tablet} {
    width: 10%;
  }
`;
const HeaderCellLeft = styled(HeaderCell)`
  text-align: left;
`;
const HeaderCellCenter = styled(HeaderCell)`
  text-align: center;
`;
const HeaderCellRight = styled(HeaderCell)`
  text-align: right;
`;
const HeaderDistance = styled(HeaderCellRight)``;
const HeaderSpeed = styled(HeaderCellCenter)``;
const HeaderElapsed = styled(HeaderCellLeft)``;
const HeaderControl = styled(HeaderCellLeft)`
  flex-grow: 1;
`;
const HeaderArrival = styled(HeaderCellRight)``;
const HeaderControlTime = styled(HeaderCellCenter)`
  @media print, ${(props) => props.theme.devices.tablet} {
    width: 12%;
  }
`;
const HeaderDeparture = styled(HeaderCellRight)``;

const TimeTable = styled.div`
  width: 100%;
  font-variant-numeric: tabular-nums;
  svg {
    margin-right: 6px;
  }
  input {
    border: solid 1px ${(props) => props.theme.colors.gray_med_translucent};
    border-radius: 5px;
    padding: 2px;
    background-color: ${(props) => props.theme.colors.gray_light_translucent};
    width: 100%;
    max-width: 60px;
    color: ${(props) => props.theme.colors.gray_med};
    outline: none;
    appearance: none;
    transition: border 0.2s ease;
    &:focus {
      border-color: ${(props) => props.theme.colors.gray_light};
    }
    @media print {
      border: none;
      background-color: transparent;
    }
  }
  strong {
    font-weight: 600;
  }
  /* @media print {
   margin-top: 100px;
  } */
`;
const TimeTableHeader = styled.div`
  display: none;
  @media print, ${(props) => props.theme.devices.tablet} {
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
  @media print, ${(props) => props.theme.devices.tablet} {
    flex-direction: row;
    align-items: stretch;
    border: none;
    border-radius: 0;
    margin-top: 0;
    transition: background 0.2s ease, color 0.2s ease;
    div {
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
  @media print {
    border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
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
  const {
    avgCtrlTime,
    avgSpeed,
    controls,
    language,
    setTimingData,
    startTime,
    sunriseTimeOfDay,
    sunsetTimeOfDay,
    timingData,
    strings,
    userTiming,
  } = props;
  let displayDate = null;

  const isNightTime = (currentTime) => {
    if (currentTime) {
      const current = currentTime.toFormat("HH':'mm':'ss");
      if (
        current &&
        (current >= sunsetTimeOfDay || current <= sunriseTimeOfDay)
      ) {
        return true;
      }
    }
    return false;
  };

  const updateControlInfo = (distance, value, type) => {
    const i = timingData.findIndex((x) => x.distance === distance);
    if (i > -1) {
      let newTimingData = [...timingData];
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
      setTimingData(newTimingData);
      process.env.NODE_ENV === "production" &&
        typeof window !== "undefined" &&
        window.gtag("event", "updateControlInfo", {
          distance: distance,
          type: type,
          value: value,
        });
      return false;
    } else {
      return false;
    }
  };

  const renderRow = (row, controlIndex) => {
    // Really should have made a less dumb data structure here :/
    const controlTiming = userTiming.filter((r) => r.distance === row.distance);
    const customControls = timingData.filter(
      (r) => r.distance === row.distance
    );
    const arrivalDuration = Duration.fromObject({
      hours: controlTiming[0]?.elapsedTime,
    });
    const isFirstControl =
      controlTiming[0]?.distance === userTiming[0].distance;
    const isLastControl =
      controlTiming[0]?.distance === userTiming[userTiming.length - 1].distance;
    let arrivalTime = null;
    let arrivalTimeFormatted = null;
    let departureTime = null;
    let departureTimeFormatted = null;
    if (controlIndex > 0) {
      arrivalTime = controlIndex > 0 ? startTime.plus(arrivalDuration) : null;
      if (arrivalTime.toLocaleString(DateTime.DATE_MED) !== displayDate) {
        arrivalTimeFormatted = arrivalTime
          .setLocale(language)
          .toFormat("ccc T");
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

    if (controlIndex < controls.length - 1) {
      departureTime = startTime.plus(departureDuration);
      if (departureTime.toLocaleString(DateTime.DATE_MED) !== displayDate) {
        departureTimeFormatted = departureTime
          .setLocale(language)
          .toFormat("ccc T");
      } else if (
        departureTime.toLocaleString(DateTime.DATE_MED) === displayDate
      ) {
        departureTimeFormatted = departureTime.toFormat("T");
      }
      displayDate = departureTime.toLocaleString(DateTime.DATE_MED);
    }
    return (
      <TimeTableRow key={row.distance}>
        {/* Distance */}
        <CellDistance>{controlTiming[0]?.distance} km</CellDistance>
        {/* Speed */}
        <CellSpeed>
          {!isFirstControl && (
            <input
              type="number"
              aria-label={`Speed to ${controlTiming[0]?.location} control`}
              id={`speedPicker_${row.distance}`}
              name={`speedPicker_${row.distance}`}
              min="10"
              max="40"
              value={
                customControls[0]?.speedToControl
                  ? customControls[0]?.speedToControl
                  : avgSpeed
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
        </CellSpeed>
        {/* Elapsed Time */}
        <CellElapsedTime>
          {!isFirstControl
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
            data-tooltip-id="tooltip-hover"
            data-tooltip-content={
              controlTiming[0]?.type === "FOOD"
                ? strings.timeTable.foodOnly
                : strings.timeTable.controlPoint
            }
          />
          <strong>{controlTiming[0]?.location}</strong>
        </CellControlName>
        {/* Arrival time */}
        <CellArrivalTime>
          {!isFirstControl && isNightTime(arrivalTime) && (
            <FontAwesomeIcon
              icon={faMoon}
              fixedWidth
              swapOpacity
              data-tooltip-id="tooltip-hover"
              data-tooltip-content={strings.chart.night}
            />
          )}
          {arrivalTimeFormatted}
        </CellArrivalTime>
        {/* Time at control */}
        <CellTimeAtControl>
          {!isFirstControl && !isLastControl && (
            <input
              type="number"
              aria-label={`Hours at ${controlTiming[0]?.location} control`}
              id={`ctrlTimePicker_${row.distance}`}
              name={`ctrlTimePicker_${row.distance}`}
              min="0"
              max="10"
              step="0.25"
              value={
                customControls[0]?.timeAtControl
                  ? customControls[0]?.timeAtControl
                  : avgCtrlTime
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
        </CellTimeAtControl>
        {/* Departure time */}
        <CellDepartureTime>
          {!isLastControl && (
            <>
              {isNightTime(departureTime) && (
                <FontAwesomeIcon
                  icon={faMoon}
                  fixedWidth
                  swapOpacity
                  data-tooltip-id="tooltip-hover"
                  data-tooltip-content={strings.chart.night}
                />
              )}
              {departureTimeFormatted}
            </>
          )}
        </CellDepartureTime>
      </TimeTableRow>
    );
  };

  return (
    <>
      <TimeTable>
        <TimeTableHeader>
          <HeaderDistance>{strings.timeTable.distance}</HeaderDistance>
          <HeaderSpeed>{strings.timeTable.speed}</HeaderSpeed>
          <HeaderElapsed>{strings.timeTable.elapsedTime}</HeaderElapsed>
          <HeaderControl>{strings.timeTable.control}</HeaderControl>
          <HeaderArrival>{strings.timeTable.arrival}</HeaderArrival>
          <HeaderControlTime>
            {strings.timeTable.hoursAtCtrl}
          </HeaderControlTime>
          <HeaderDeparture>{strings.timeTable.departure}</HeaderDeparture>
        </TimeTableHeader>
        {controls.map((row, index) => renderRow(row, index))}
      </TimeTable>
    </>
  );
};

export default TimingTable;
