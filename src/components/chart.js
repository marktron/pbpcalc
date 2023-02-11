import * as React from "react";
import styled from "styled-components";
import { Scatter } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { DateTime, Duration, Interval } from "luxon";
import Theme from "../components/theme";
import controls from "../data/controls";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  annotationPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

let timing = [];

const ChartWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px;
  padding: 0;
  min-height: 500px;
  /* border: solid 3px ${(props) => props.theme.colors.blue_dark}; */
`;

const Projection = styled.div`
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
`;

const controlData = [];
for (let i = 0; i < controls.length; i++) {
  controlData[i] = {
    distance: controls[i].distance,
    elapsedTime: 0,
    location: controls[i].location,
    type: controls[i].type,
  };
}

const Chart = (props) => {
  let startTime = "";
  // General sunrise/sunset times for Tinténiac on Aug 20
  const sunriseTimeOfDay = "07:00:00.000";
  const sunsetTimeOfDay = "21:00:00.000";
  const nightHours = [];
  if (props?.waveInfo?.startTime) {
    startTime = DateTime.fromISO(
      "2023-08-" +
        (props.waveInfo.timeLimit === 84 ? "21" : "20") +
        "T" +
        props.waveInfo.startTime +
        ":00.000"
    );
    for (let i = 0; i < 4; i++) {
      // TODO: Account for first 84 hour start times that happen before sunrise
      // This assumes no one starts after sunset, and the event is less than four nights long
      let sunsetTime = DateTime.fromISO(
        `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
          startTime.day + i
        }T${sunsetTimeOfDay}`
      );

      let sunsetHours = Interval.fromDateTimes(startTime, sunsetTime).length(
        "hours"
      );

      let sunriseTime = DateTime.fromISO(
        `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
          startTime.day + i + 1
        }T${sunriseTimeOfDay}`
      );
      let sunriseHours = Interval.fromDateTimes(startTime, sunriseTime).length(
        "hours"
      );
      nightHours[i] = {
        sunset: sunsetHours,
        sunrise: sunriseHours,
      };
    }
  }

  // TODO: Make this more DRY
  const night1 = {
    type: "box",
    backgroundColor: Theme.colors.blue_dark_translucent,
    borderColor: Theme.colors.blue_dark_translucent,
    borderWidth: 0,
    drawTime: "beforeDatasetsDraw",
    xMax: 0,
    xMin: 1220,
    yMax: nightHours[0]?.sunrise,
    yMin: nightHours[0]?.sunset,
  };
  const night2 = {
    type: "box",
    backgroundColor: Theme.colors.blue_dark_translucent,
    borderColor: Theme.colors.blue_dark_translucent,
    borderWidth: 0,
    drawTime: "beforeDatasetsDraw",
    xMax: 0,
    xMin: 1220,
    yMax: nightHours[1]?.sunrise,
    yMin: nightHours[1]?.sunset,
  };
  const night3 = {
    type: "box",
    backgroundColor: Theme.colors.blue_dark_translucent,
    borderColor: Theme.colors.blue_dark_translucent,
    borderWidth: 0,
    drawTime: "beforeDatasetsDraw",
    xMax: 0,
    xMin: 1220,
    yMax: nightHours[2]?.sunrise,
    yMin: nightHours[2]?.sunset,
  };
  const night4 = {
    type: "box",
    backgroundColor: Theme.colors.blue_dark_translucent,
    borderColor: Theme.colors.blue_dark_translucent,
    borderWidth: 0,
    drawTime: "beforeDatasetsDraw",
    xMax: 0,
    xMin: 1220,
    yMax: nightHours[3]?.sunrise,
    yMin: nightHours[3]?.sunset,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    parsing: {
      xAxisKey: "distance",
      yAxisKey: "elapsedTime",
    },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 1220,
      },
      y: {
        type: "linear",
        min: 0,
        max: props?.waveInfo?.timeLimit ? props?.waveInfo?.timeLimit : 90,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      annotation: {
        annotations: {
          night1,
          night2,
          night3,
          night4,
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Projected Time",
        id: 1,
        data: props?.timing,
        showLine: true,
        borderColor: Theme.colors.blue_light,
        backgroundColor: Theme.colors.blue_light,
        pointStyle: false,
        borderWidth: 3,
      },
      {
        label:
          (props?.waveInfo?.timeLimit ? props?.waveInfo?.timeLimit : 90) +
          " Hour Average",
        id: 2,
        data: [
          { distance: 0, elapsedTime: 0 },
          {
            distance: 1220,
            elapsedTime: props?.waveInfo?.timeLimit
              ? props?.waveInfo?.timeLimit
              : 90,
          },
        ],
        showLine: true,
        borderWidth: 1,
        borderColor: Theme.colors.gray_light,
        backgroundColor: Theme.colors.gray_light,
        pointStyle: false,
      },
      {
        label: "Controls",
        id: 3,
        data: controlData,
        showLine: false,
        backgroundColor: Theme.colors.red,
        pointStyle: "circle",
        pointRadius: 5,
      },
    ],
  };

  let elapsedTimeDisplay = Duration.fromDurationLike({
    hours: props?.timing[props?.timing.length - 1].elapsedTime,
  }).toFormat("hh:mm");
  return (
    <>
      <ChartWrapper>
        <Scatter datasetIdKey="id" data={data} options={options} />
      </ChartWrapper>
      <Projection>Projected Elapsed Time – {elapsedTimeDisplay}</Projection>
    </>
  );
};
export default Chart;
