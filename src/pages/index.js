import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Chart from "../components/chart";
import ChartControls from "../components/chartControls";
import startWaves from "../data/startWaves";
import controls from "../data/controls";
const Page = styled.main`
`;

const PageHeadline = styled.h1`
  font-weight: 900;
  font-size: 2.5em;
  letter-spacing: -0.02em;
  line-height: 1;
  color: ${(props) => props.theme.colors.blue_dark};
  text-align: center;
  background: ${(props) => props.theme.colors.blue_light};
  padding: 40px;
  border-bottom: solid 3px ${(props) => props.theme.colors.blue_dark};
`;
const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 30px;
`;
const Controls = styled.div`
  margin-right: 30px;
  width: 20%;
`;
const ChartWrapper = styled.div`
  flex-grow: 1;
`;

let timingDataInit = [];

for (let i = 0; i < controls.length; i++) {
  timingDataInit.push({
    distance: controls[i].distance,
    location: controls[i].location,
    speedToControl: null,
    timeAtControl: null,
    type: controls[i].type,
  });
}

const IndexPage = (props) => {
  const [startWave, setStartWave] = useState("G");
  const [avgSpeed, setAvgSpeed] = useState(20);
  const [avgCtrlTime, setAvgCtrlTime] = useState(1);
  const [timingData, setTimingData] = useState(timingDataInit);
  let waveInfo = startWaves.find(({ wave }) => wave === startWave);
  return (
    <Page>
      <PageHeadline>(Super Unofficial) 2023 Paris–Brest–Paris Time Calculator</PageHeadline>
      <ContentWrapper>
        <Controls>
          <ChartControls
            startWave={startWave}
            setStartWave={setStartWave}
            avgSpeed={avgSpeed}
            setAvgSpeed={setAvgSpeed}
            avgCtrlTime={avgCtrlTime}
            setAvgCtrlTime={setAvgCtrlTime}
            timingData={timingData}
            setTimingData={setTimingData}
          />
        </Controls>
        <ChartWrapper>
          <Chart
            waveInfo={waveInfo}
            avgSpeed={avgSpeed}
            avgCtrlTime={avgCtrlTime}
            props={props}
            timingData={timingData}
          />
        </ChartWrapper>
      </ContentWrapper>
    </Page>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
