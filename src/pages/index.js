import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Chart from "../components/chart";
import ChartControls from "../components/chartControls";
const Page = styled.main`
  padding: 20px;
`;

const PageHeadline = styled.h1`
  font-weight: 800;
  color: ${(props) => props.theme.colors.blue_dark};
`;
const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-top: 20px;
`;
const Controls = styled.div`
  margin-right: 20px;
  width: 20%;
`;
const ChartWrapper = styled.div`
  flex-grow: 1;
`;

// TODO: Confirm that there's no wave O
const startWaves = [
  { wave: "A", startTime: "16:00", timeLimit: 80 },
  { wave: "B", startTime: "16:15", timeLimit: 80 },
  { wave: "C", startTime: "16:30", timeLimit: 80 },
  { wave: "D", startTime: "16:45", timeLimit: 80 },
  { wave: "E", startTime: "17:00", timeLimit: 80 },
  { wave: "F", startTime: "17:15", timeLimit: 90 },
  { wave: "G", startTime: "17:30", timeLimit: 90 },
  { wave: "H", startTime: "17:45", timeLimit: 90 },
  { wave: "I", startTime: "18:00", timeLimit: 90 },
  { wave: "J", startTime: "18:15", timeLimit: 90 },
  { wave: "K", startTime: "18:30", timeLimit: 90 },
  { wave: "L", startTime: "18:45", timeLimit: 90 },
  { wave: "M", startTime: "19:00", timeLimit: 90 },
  { wave: "N", startTime: "19:15", timeLimit: 90 },
  { wave: "P", startTime: "19:30", timeLimit: 90 },
  { wave: "Q", startTime: "19:45", timeLimit: 90 },
  { wave: "R", startTime: "20:00", timeLimit: 90 },
  { wave: "S", startTime: "20:15", timeLimit: 90 },
  { wave: "T", startTime: "20:30", timeLimit: 90 },
  { wave: "U", startTime: "20:45", timeLimit: 90 },
  { wave: "V", startTime: "21:00", timeLimit: 90 },
  { wave: "W", startTime: "04:45", timeLimit: 90 },
  { wave: "X", startTime: "05:00", timeLimit: 84 },
  { wave: "Y", startTime: "05:15", timeLimit: 84 },
  { wave: "Z", startTime: "05:30", timeLimit: 84 },
];

const IndexPage = (props) => {
  const [startWave, setStartWave] = useState("");
  const [avgSpeed, setAvgSpeed] = useState(20);

  let waveInfo = startWave
    ? startWaves.find(({ wave }) => wave === startWave)
    : null;

  return (
    <Page>
      <PageHeadline>Paris Brest Paris Time Calculator</PageHeadline>
      <ContentWrapper>
        <Controls>
          <ChartControls
            startWave={startWave}
            setStartWave={setStartWave}
            avgSpeed={avgSpeed}
            setAvgSpeed={setAvgSpeed}
          />
        </Controls>
        <ChartWrapper>
          <Chart waveInfo={waveInfo} avgSpeed={avgSpeed} props={props} />
        </ChartWrapper>
      </ContentWrapper>
    </Page>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
