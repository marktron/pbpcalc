import * as React from "react";
import styled from "styled-components";
import { DateTime, Duration, Interval } from "luxon";
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
  tr {
    th {
      border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
    }
    td,
    th {
      padding: 3px 6px;
      strong {
        font-weight: 600;
      }
    }
    &:nth-child(even) {
      background: ${(props) => props.theme.colors.gray_light_translucent};
    }
  }
`;

const TimingTable = (props) => {
  const { timing, controls, startTime } = props;
  let rowCounter = 0;
  let displayDate = null;

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
          {rowCounter > 1 &&
            Duration.fromDurationLike({
              hours: controlTiming[0]?.elapsedTime,
            }).toFormat("hh:mm")}
        </CellRightAlign>
        <CellLeftAlign>
          <strong>{controlTiming[0]?.location}</strong>
        </CellLeftAlign>
        <CellRightAlign>{arrivalTimeFormatted}</CellRightAlign>
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
            <HeaderRightAlign>Elapsed Time</HeaderRightAlign>
            <HeaderLeftAlign>Control</HeaderLeftAlign>
            <HeaderRightAlign>Arrival Time</HeaderRightAlign>
            <HeaderRightAlign>Departure Time</HeaderRightAlign>
          </tr>
        </thead>
        <tbody>{controls.map((row) => renderRow(row))}</tbody>
      </TimeTable>
    </>
  );
};

export default TimingTable;
