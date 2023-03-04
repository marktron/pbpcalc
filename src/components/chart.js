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

const ChartWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 30px;
  padding: 0;
  min-height: 500px;
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
  let nightAnnotations = {}
  // Approximate sunrise/sunset times for Tinténiac on Aug 20
  const sunriseTimeOfDay = "07:00:00.000";
  const sunsetTimeOfDay = "21:00:00.000";
  if (props?.waveInfo?.startTime) {
    startTime = DateTime.fromISO(
      "2023-08-" +
        (props.waveInfo.timeLimit === 84 ? "21" : "20") +
        "T" +
        props.waveInfo.startTime +
        ":00.000"
    );
    for (let i = 0; i < 4; i++) {
      let sunsetTime = null;
      let sunriseTime = null;
      let sunsetHours = 0;
      let sunriseHours = 0;
      if (props.waveInfo.timeLimit === 84) {
        sunsetTime = DateTime.fromISO(
          `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
            startTime.day + i - 1
          }T${sunsetTimeOfDay}`
        );
        sunriseTime = DateTime.fromISO(
          `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
            startTime.day + i
          }T${sunriseTimeOfDay}`
        );
      } else {
        sunsetTime = DateTime.fromISO(
          `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
            startTime.day + i
          }T${sunsetTimeOfDay}`
        );

        sunriseTime = DateTime.fromISO(
          `${startTime.year}-${startTime.month < 10 && "0"}${startTime.month}-${
            startTime.day + i + 1
          }T${sunriseTimeOfDay}`
        );
      }
      sunsetHours =
        i === 0 && props.waveInfo.timeLimit === 84
          ? 0
          : Interval.fromDateTimes(startTime, sunsetTime).length("hours");
      sunriseHours = Interval.fromDateTimes(startTime, sunriseTime).length(
        "hours"
      );

      nightAnnotations[i] = {
        type: "box",
        backgroundColor: Theme.colors.blue_dark_translucent,
        borderColor: Theme.colors.blue_dark_translucent,
        borderWidth: 0,
        drawTime: "beforeDatasetsDraw",
        xMax: 0,
        xMin: 1220,
        yMax: sunriseHours,
        yMin: sunsetHours,
      };
    }
  }

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
        annotations: nightAnnotations,
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
      <Projection>Projected Time – {elapsedTimeDisplay}</Projection>
    </>
  );
};
export default Chart;
