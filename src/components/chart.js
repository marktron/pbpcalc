import * as React from "react";
import styled from "styled-components";
import { Scatter } from "react-chartjs-2";
import Theme from "../components/theme";

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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);
const timing = [
  { x: 0, y: 0 },
  { x: 119, y: 6 },
  { x: 119, y: 6.5 },
  { x: 203, y: 10 },
  { x: 203, y: 10.5 },
  { x: 292.5, y: 16 },
  { x: 292.5, y: 18 },
  { x: 353.5, y: null },
  { x: 353.5, y: null },
  { x: 378.5, y: null },
  { x: 378.5, y: null },
  { x: 435.3, y: null },
  { x: 435.3, y: null },
  { x: 482, y: null },
  { x: 482, y: null },
  { x: 514.9, y: null },
  { x: 514.9, y: null },
  { x: 604.3, y: null },
  { x: 604.3, y: null },
  { x: 697.1, y: null },
  { x: 697.1, y: null },
  { x: 731.6, y: null },
  { x: 731.6, y: null },
  { x: 782.2, y: null },
  { x: 782.2, y: null },
  { x: 842.3, y: null },
  { x: 842.3, y: null },
  { x: 867.3, y: null },
  { x: 867.3, y: null },
  { x: 928.2, y: null },
  { x: 928.2, y: null },
  { x: 1017.7, y: null },
  { x: 1017.7, y: null },
  { x: 1099, y: null },
  { x: 1099, y: null },
  { x: 1176.9, y: null },
  { x: 1176.9, y: null },
  { x: 1220, y: null },
];
const data = {
  datasets: [
    {
      label: "Projected Time",
      id: 1,
      data: timing,
      showLine: true,
      borderColor: Theme.colors.blue_light,
      backgroundColor: Theme.colors.blue_light,
    },
    {
      label: "90 Hour Average",
      id: 2,
      data: [
        { x: 0, y: 0 },
        { x: 1220, y: 90 },
      ],
      showLine: true,
      borderWidth: 1,
      borderColor: Theme.colors.gray_light,
      backgroundColor: Theme.colors.gray_light,
    },
  ],
};

const ChartWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Chart = (props) => {
  const options = {
    responsive: true,
    spanGaps: true,
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
    },
  };

  if (props?.avgSpeed) {
    for (let i = 0; i < timing.length; i++) {
      let elapsedTime = 0;
      if (i > 0) {
        elapsedTime =
          timing[i - 1].y + (timing[i].x - timing[i - 1].x) / props.avgSpeed;
      }
      timing[i].y = elapsedTime;
    }
  }
  return (
    <ChartWrapper>
      <Scatter datasetIdKey="id" data={data} options={options} />
    </ChartWrapper>
  );
};
export default Chart;
