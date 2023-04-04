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
  defaults,
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
  min-height: 200px;
  max-height: 350px;
  @media print, ${(props) => props.theme.devices.tablet} {
    min-height: 500px;
    max-height: 700px;
  }
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

defaults.font.size = 14;
defaults.font.family = "Work Sans";
defaults.color = Theme.colors.gray_med;

const Chart = (props) => {
  const {
    language,
    strings,
    sunriseTimeOfDay,
    sunsetTimeOfDay,
    userTiming,
    waveInfo,
  } = props;
  let startTime = "";
  let nightAnnotations = {};

  if (waveInfo?.startTime) {
    startTime = DateTime.fromISO(
      "2023-08-" +
        (waveInfo.timeLimit === 84 ? "21" : "20") +
        "T" +
        waveInfo.startTime +
        ":00.000"
    );
    for (let i = 0; i < 4; i++) {
      let sunsetTime = null;
      let sunriseTime = null;
      let sunsetHours = 0;
      let sunriseHours = 0;
      if (waveInfo.timeLimit === 84) {
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
        i === 0 && waveInfo.timeLimit === 84
          ? 0
          : Interval.fromDateTimes(startTime, sunsetTime).length("hours");
      sunriseHours = Interval.fromDateTimes(startTime, sunriseTime).length(
        "hours"
      );

      nightAnnotations[i] = {
        type: "box",
        backgroundColor: Theme.colors.blue_light_translucent,
        borderColor: Theme.colors.blue_light_translucent,
        borderWidth: 0,
        drawTime: "beforeDatasetsDraw",
        label: {
          content: strings.chart.night,
          color: Theme.colors.blue_dark_translucent,
          display: true,
          font: {
            weight: 400,
            size: 12,
          },
          position: { x: "start", y: "center" },
        },
        xMax: 0,
        xMin: 1220,
        yMax: sunriseHours,
        yMin: sunsetHours,
      };
    }
  }

  const toolTipTitle = (tooltipItems) => {
    const controlInfo =
      tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex];
    if (
      controlInfo?.location !== undefined &&
      controlInfo?.distance !== undefined
    ) {
      return `${controlInfo.location} ${controlInfo.distance} km`;
    } else {
      return false;
    }
  };
  const toolTipTimeInHand = (tooltipItems) => {
    const controlInfo =
      tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex];
    if (
      controlInfo?.location !== undefined &&
      controlInfo?.distance !== undefined &&
      controlInfo?.elapsedTime !== undefined
    ) {
      const timeLimit = waveInfo?.timeLimit ? waveInfo?.timeLimit : 90;
      const avgTime = (timeLimit / 1220) * controlInfo?.distance;
      const timeInHand = Duration.fromDurationLike({
        hours: avgTime - controlInfo?.elapsedTime,
      });

      if (timeInHand.valueOf() < 0) {
        return `${strings.chart.timeInHand}: -${timeInHand.negate().toFormat("hh:mm")}`;
      } else {
        return `${strings.chart.timeInHand}: ${timeInHand.toFormat("hh:mm")}`;
      }
    } else {
      return false;
    }
  };
  const toolTipLabel = (tooltipItems) => {
    const controlInfo = tooltipItems?.dataset?.data[tooltipItems?.dataIndex];
    if (
      controlInfo?.location !== undefined &&
      controlInfo?.distance !== undefined &&
      controlInfo?.elapsedTime !== undefined
    ) {
      // Find all timing data for this control (arrival/departure)
      const controlItems = tooltipItems.dataset.data.filter(
        (r) => r.distance === controlInfo.distance
      );
      controlItems.sort((a, b) => a.elapsedTime - b.elapsedTime);
      const elapsedTime = Duration.fromDurationLike({
        hours: controlInfo.elapsedTime,
      });
      const labelTime = startTime
        .setLocale(language)
        .plus(elapsedTime)
        .toFormat("ccc T");

      return `${
        controlInfo.elapsedTime === controlItems[0].elapsedTime
          ? strings.chart.arrivalTime
          : strings.chart.departureTime
      }: ${labelTime}`;
    } else {
      return false;
    }
  };
  const toolTipFilter = (tooltipItems, data) => {
    if (tooltipItems?.dataset?.label === strings.chart.projectedTime) {
      return true;
    } else {
      return false;
    }
  };
  const toolTipFooter = (tooltipItems) => {
    let nextControlName = "";
    let nextControlDistance = "";
    let elapsedDistance =
      tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex]?.distance;

    if (
      tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex]?.distance !==
      tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex + 1]?.distance
    ) {
      nextControlName =
        tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex + 1]?.location;
      nextControlDistance =
        tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex + 1]?.distance;
    } else {
      nextControlName =
        tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex + 2]?.location;
      nextControlDistance =
        tooltipItems[0]?.dataset?.data[tooltipItems[0].dataIndex + 2]?.distance;
    }
    if (nextControlName !== undefined) {
      return `${strings.chart.distanceTo} ${nextControlName}: ${Math.round(
        nextControlDistance - elapsedDistance
      )} km`;
    } else {
      return false;
    }
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
        title: {
          display: true,
          text: strings.chart.xAxisLabel,
          color: Theme.colors.gray_light,
        },
      },
      y: {
        type: "linear",
        min: 0,
        max: waveInfo?.timeLimit ? waveInfo?.timeLimit : 90,
        title: {
          display: true,
          text: strings.chart.yAxisLabel,
          color: Theme.colors.gray_light,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      annotation: {
        annotations: nightAnnotations,
      },
      tooltip: {
        padding: 10,
        displayColors: false,
        backgroundColor: Theme.colors.blue_dark,
        bodyColor: Theme.colors.white,
        titleColor: Theme.colors.white,
        titleFont: {
          weight: 600,
          size: 16,
        },
        footerFont: {
          weight: 400,
        },

        interaction: {
          mode: "nearest",
        },
        filter: toolTipFilter,
        callbacks: {
          title: toolTipTitle,
          label: toolTipLabel,
          afterBody: toolTipTimeInHand,
          footer: toolTipFooter,
        },
      },
    },
  };

  let waveAvgString = strings.chart.eightyHourAvg;
  switch (waveInfo?.timeLimit) {
  case 80:
    waveAvgString = strings.chart.eightyHourAvg;
    break;
  case 84:
    waveAvgString = strings.chart.eightyFourHourAvg;
    break;
  case 90:
    waveAvgString = strings.chart.ninetyHourAvg;
    break;
  default:
    break;
}

;
  const data = {
    datasets: [
      {
        label: strings.chart.projectedTime,
        id: 1,
        data: userTiming,
        showLine: true,
        borderColor: Theme.colors.blue_med,
        backgroundColor: Theme.colors.blue_med,
        pointStyle: "circle",
        borderWidth: 3,
      },
      {
        label: waveAvgString,
        id: 2,
        animation: false,
        data: [
          { distance: 0, elapsedTime: 0 },
          {
            distance: 1220,
            elapsedTime: waveInfo?.timeLimit ? waveInfo?.timeLimit : 90,
          },
        ],
        showLine: true,
        borderWidth: 0.75,
        borderColor: Theme.colors.gray_light,
        backgroundColor: Theme.colors.gray_light,
        pointStyle: false,
      },
    ],
  };

  let elapsedTimeDisplay = Duration.fromDurationLike({
    hours: userTiming[userTiming?.length - 1].elapsedTime,
  }).toFormat("hh:mm");
  return (
    <>
      <ChartWrapper>
        <Scatter datasetIdKey="id" data={data} options={options} />
      </ChartWrapper>
      <Projection>{`${strings.chart.projectedFinishTime} – ${elapsedTimeDisplay}`}</Projection>
    </>
  );
};
export default Chart;
