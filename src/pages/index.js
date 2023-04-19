import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import LocalizedStrings from "react-localization";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { Tooltip } from "react-tooltip";
import Chart from "../components/chart";
import GeneralControls from "../components/generalControls";
import startWaves from "../data/startWaves";
import controls from "../data/controls";
import localizations from "../data/localizations";
import TimingTable from "../components/timingTable";
import Nav from "../components/nav";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

const Page = styled.main``;

const PageHeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
  h1 {
    font-weight: 900;
    font-size: 2rem;
    letter-spacing: -0.02em;
    line-height: 1;
    color: ${(props) => props.theme.colors.blue_dark};
    text-align: center;
    background: -webkit-linear-gradient(
      45deg,
      hsl(231deg 30% 26%) 0%,
      hsl(223deg 34% 31%) 21%,
      hsl(216deg 38% 35%) 30%,
      hsl(211deg 42% 39%) 39%,
      hsl(207deg 47% 42%) 46%,
      hsl(203deg 52% 45%) 54%,
      hsl(200deg 57% 48%) 61%,
      hsl(197deg 62% 50%) 69%,
      hsl(194deg 72% 52%) 79%,
      hsl(192deg 83% 55%) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media ${(props) => props.theme.devices.tablet} {
      font-size: 3rem;
    }
  }
  em {
    font-weight: 400;
    font-family: "Permanent Marker", sans-serif;
    font-size: 1.5rem;
    margin-bottom: 5px;
    transform: rotate(-2.5deg);
  }
  @media print {
    display: none;
  }
`;
const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  max-width: 1400px;
  padding: 0 20px;
`;

const FlagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 10px;
  box-shadow: 0 -10px 25px ${(props) => props.theme.colors.gray_med};
  @media print {
    display: none;
  }
`;
const StripeBlue = styled.div`
  background-color: ${(props) => props.theme.colors.blue_dark};
  width: 33.333%;
`;
const StripeWhite = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 33.333%;
`;
const StripeRed = styled.div`
  background-color: ${(props) => props.theme.colors.red};
  width: 33.333%;
`;
const Footer = styled.footer`
  font-size: 80%;
  text-align: center;
  padding: 0 20px 20px 20px;
  @media print {
    display: none;
  }
  a {
    color: ${(props) => props.theme.colors.gray_med};
    border-bottom: solid 1px ${(props) => props.theme.colors.gray_light};
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.colors.blue_dark};
      background: ${(props) => props.theme.colors.blue_light_translucent};
      border-bottom-color: ${(props) =>
        props.theme.colors.blue_light_translucent};
    }
  }
  svg {
    margin-right: 5px;
    color: ${(props) => props.theme.colors.red};
  }
`;

// Approximate sunrise/sunset times for Tinténiac on Aug 20
const sunriseTimeOfDay = "07:00:00.000";
const sunsetTimeOfDay = "21:00:00.000";

let timingDataInit = [];
let userTiming = [];

for (let i = 0; i < controls.length; i++) {
  timingDataInit.push({
    ...controls[i],
    speedToControl: null,
    timeAtControl: null,
  });
}

const IndexPage = (props) => {
  const [language, setLanguage] = useState("en");
  const [startWave, setStartWave] = useState();
  const [avgSpeed, setAvgSpeed] = useState(20);
  const [avgCtrlTime, setAvgCtrlTime] = useState(0.5);
  const [timingData, setTimingData] = useState(timingDataInit);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      updateLanguage("en");
    }
    const storedStartWave = localStorage.getItem("startWave");
    if (storedStartWave) {
      setStartWave(storedStartWave);
    } else {
      updateStartWave("G");
    }
    const storedAvgSpeed = localStorage.getItem("avgSpeed");
    if (storedAvgSpeed) {
      setAvgSpeed(storedAvgSpeed);
    } else {
      updateAvgSpeed(20);
    }
    const storedAvgCtrlTime = localStorage.getItem("avgCtrlTime");
    if (storedAvgCtrlTime) {
      setAvgCtrlTime(storedAvgCtrlTime);
    } else {
      updateAvgCtrlTime(0.5);
    }
  }, []);

  const updateLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // TODO: This should all probably be a single object
  const updateStartWave = (wave) => {
    setStartWave(wave);
    localStorage.setItem("startWave", wave);
  };
  const updateAvgSpeed = (speed) => {
    setAvgSpeed(speed);
    localStorage.setItem("avgSpeed", speed);
  };
  const updateAvgCtrlTime = (hours) => {
    setAvgCtrlTime(hours);
    localStorage.setItem("avgCtrlTime", hours);
  };

  let strings = new LocalizedStrings(localizations);
  strings.setLanguage(language);

  let waveInfo = startWaves.find(({ wave }) => wave === startWave);

  // Calculate all the timing stuff…
  let elapsedTime = 0.0;
  let t = 0;
  for (let i = 0; i < timingData.length; i++) {
    if (i > 0) {
      elapsedTime = (
        Number(userTiming[t - 1].elapsedTime) +
        Number(timingData[i].distance - timingData[i - 1].distance) /
          Number(
            timingData[i]?.speedToControl
              ? timingData[i].speedToControl
              : avgSpeed
          )
      ).toFixed(3);
      userTiming[t] = {
        ...timingData[i],
        elapsedTime: Number(elapsedTime).toFixed(3),
      };
      t++;
      if (i < timingData.length - 1) {
        // Add time stopped at controls (but not the final one)
        elapsedTime = (
          Number(elapsedTime) +
          Number(
            timingData[i].timeAtControl
              ? timingData[i].timeAtControl
              : avgCtrlTime
          )
        ).toFixed(3);
        userTiming[t] = {
          ...timingData[i],
          elapsedTime: elapsedTime,
        };
        t++;
      }
    } else {
      // First control (starting point)
      userTiming[t] = {
        ...timingData[i],
        elapsedTime: Number(elapsedTime).toFixed(3),
      };
      t++;
    }
  }

  let startTime = DateTime.fromISO(
    "2023-08-" +
      (waveInfo?.timeLimit === 84 ? "21" : "20") +
      "T" +
      waveInfo?.startTime +
      ":00.000"
  );

  return (
    <>
      <Page>
        <FlagWrapper>
          <StripeBlue></StripeBlue>
          <StripeWhite></StripeWhite>
          <StripeRed></StripeRed>
        </FlagWrapper>
        <Nav
          updateLanguage={updateLanguage}
          language={language}
          strings={strings}
        />
        <PageHeadline>
          <em>{strings.metadata.header.unofficial}</em>
          <h1>{strings.metadata.header.title}</h1>
        </PageHeadline>
        <ContentWrapper>
          <Chart
            language={language}
            strings={strings}
            sunriseTimeOfDay={sunriseTimeOfDay}
            sunsetTimeOfDay={sunsetTimeOfDay}
            userTiming={userTiming}
            waveInfo={waveInfo}
          />
          <GeneralControls
            avgCtrlTime={avgCtrlTime}
            avgSpeed={avgSpeed}
            startWave={startWave}
            strings={strings}
            updateAvgCtrlTime={updateAvgCtrlTime}
            updateAvgSpeed={updateAvgSpeed}
            updateStartWave={updateStartWave}
          />
          <TimingTable
            avgCtrlTime={avgCtrlTime}
            avgSpeed={avgSpeed}
            controls={controls}
            language={language}
            setTimingData={setTimingData}
            startTime={startTime}
            sunriseTimeOfDay={sunriseTimeOfDay}
            sunsetTimeOfDay={sunsetTimeOfDay}
            timingData={timingData}
            strings={strings}
            userTiming={userTiming}
            waveInfo={waveInfo}
          />
        </ContentWrapper>
      </Page>
      <Footer>
        <FontAwesomeIcon icon={faCanadianMapleLeaf} />
        {strings.metadata.footer.madeBy}{" "}
        <a
          href="https://www.strava.com/athletes/marktron3k"
          target="_blank"
          rel="noreferrer"
        >
          Mark Allen
        </a>{" "}
        {strings.metadata.footer.startingWave}
      </Footer>
      <Tooltip id="tooltip-hover" />
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <html lang="en" />
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2023 Paris–Brest–Paris Ride Calculator</title>
    <meta
      name="keywords"
      content="Paris-Brest-Paris, PBP, PBP 2023, cycling event, ride calculator, brevet planning, progress tracking, long-distance cycling, randonneuring"
    />
    <meta
      name="description"
      content="Plan your 2023 Paris-Brest-Paris randonneuring adventure with this (totally unofficial) PBP Ride Calculator. Optimize your schedule, plan your strategy, and stay ahead of the time limits."
    />
    <meta
      property="og:title"
      content="2023 Paris–Brest–Paris Ride Calculator"
    />
    <meta
      property="og:description"
      content="Plan your 2023 Paris-Brest-Paris randonneuring adventure with this (totally unofficial) PBP Ride Calculator. Optimize your schedule, plan your strategy, and stay ahead of the time limits."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https:/pbpcalc.com" />
    <meta property="og:image" content="https:/pbpcalc.com/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:title"
      content="2023 Paris–Brest–Paris Ride Calculator"
    />
    <meta
      property="twitter:description"
      content="Plan your 2023 Paris-Brest-Paris randonneuring adventure with this (totally unofficial) PBP Ride Calculator. Optimize your schedule, plan your strategy, and stay ahead of the time limits."
    />
    <meta property="twitter:image" content="https:/pbpcalc.com/og-image.png" />
  </>
);
