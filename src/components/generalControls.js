import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/pro-duotone-svg-icons";

const ControlPanel = styled.div`
  background-color: ${(props) => props.theme.colors.gray_med_translucent};
  color: ${(props) => props.theme.colors.black};
  padding: 15px;
  margin: 20px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  line-height: 1;
  strong {
    font-weight: 800;
    color: ${(props) => props.theme.colors.gray_med};
  }
  label {
    font-weight: 400;
    margin-top: 20px;
    input,
    select {
      margin-left: 10px;
      border: solid 1px transparent;
      padding: 2px;
      font-weight: 400;
      transition: border 0.2s ease;
      outline: none;
      border-radius: 5px;
      &:focus {
        border-color: ${(props) => props.theme.colors.gray_light};
      }
    }
    input {
      width: 60px;
    }
  }
  @media ${(props) => props.theme.devices.tablet} {
    flex-direction: row;
    label {
      margin-top: 0px;
      input,
      select {
        display: block;
        margin-top: 5px;
        margin-left: 0;
      }
    }
  }
  @media ${(props) => props.theme.devices.desktop} {
    label {
      margin-top: 0px;
      input,
      select {
        display: inline;
        margin-top: 0;
        margin-left: 10px;
      }
    }
  }
  @media print {
    display: none;
  }
`;
const Instructions = styled.div`
  font-weight: 400;
  font-family: "Permanent Marker";
  background-color: ${(props) => props.theme.colors.yellow};
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  @media print {
    display: none;
  }
`;

const CloseInstructionsIcon = styled.div`
  font-size: 26px;
  margin-left: 20px;
  color: ${(props) => props.theme.colors.blue_dark};
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
  float: right;
`;

export default function GeneralControls(props) {
  const {
    avgCtrlTime,
    avgSpeed,
    setAvgCtrlTime,
    setAvgSpeed,
    setStartWave,
    startWave,
    strings,
  } = props;

  const [showIntroInstructions, setShowIntroInstructions] = useState("false");

  useEffect(() => {
    const storedValue = localStorage.getItem("showIntroInstructions");
    if (storedValue) {
      setShowIntroInstructions(storedValue);
    } else {
      setShowIntroInstructions("true");
      localStorage.setItem("showIntroInstructions", "true");
    }
  }, []);

  const updateStartWave = (wave) => {
    setStartWave(wave);
    process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      window.gtag("event", "setStartingWave", { wave: wave });
  };
  const updateAvgSpeed = (speed) => {
    setAvgSpeed(speed);
    process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      window.gtag("event", "setAvgSpeed", { speed: speed });
  };
  const updateAvgCtrlTime = (time) => {
    setAvgCtrlTime(time);
    process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" &&
      window.gtag("event", "setAvgCtrlTime", { time: time });
  };
  const hideInstructions = () => {
    setShowIntroInstructions("false");
    localStorage.setItem("showIntroInstructions", "false");
  };
  return (
    <>
      {showIntroInstructions === "true" && (
        <Instructions>
          <CloseInstructionsIcon>
            <FontAwesomeIcon
              icon={faRectangleXmark}
              onClick={(e) => hideInstructions()}
            />
          </CloseInstructionsIcon>
          {strings.instructions}
        </Instructions>
      )}
      <ControlPanel>
        <strong>{strings.settings.generalSettings}</strong>
        <label>
          {strings.settings.startingWave}
          <select
            id="wavePicker"
            value={startWave}
            onChange={(e) => updateStartWave(e.target.value)}
          >
            <optgroup label={strings.settings.eightyHours}>
              <option value="A">A – 16:00</option>
              <option value="B">B – 16:15</option>
              <option value="C">C – 16:30</option>
              <option value="D">D – 16:45</option>
              <option value="E">E – 17:00</option>
            </optgroup>
            <optgroup label={strings.settings.ninetyHours}>
              <option value="F">F – 17:15</option>
              <option value="G">G – 17:30</option>
              <option value="H">H – 17:45</option>
              <option value="I">I – 18:00</option>
              <option value="J">J – 18:15</option>
              <option value="K">K – 18:30</option>
              <option value="L">L – 18:45</option>
              <option value="M">M – 19:00</option>
              <option value="N">N – 19:15</option>
              <option value="O">O – 19:30</option>
              <option value="P">P – 19:45</option>
              <option value="Q">Q – 20:00</option>
              <option value="R">R – 20:15</option>
              <option value="S">S – 20:30</option>
              <option value="T">T – 20:45</option>
              <option value="U">U – 21:00</option>
            </optgroup>
            <optgroup label={strings.settings.eightyFourHours}>
              <option value="V">V – 04:45</option>
              <option value="W">W – 05:00</option>
              <option value="X">X – 05:15</option>
              <option value="Y">Y – 05:30</option>
              <option value="Z">Z – 05:45</option>
              <option value="+">+ – 06:00</option>
            </optgroup>
          </select>
        </label>
        <label>
          {strings.settings.speed}
          <input
            type="number"
            id="avgSpeedPicker"
            name="avgSpeedPicker"
            min="10"
            max="40"
            value={avgSpeed}
            onChange={(e) => updateAvgSpeed(e.target.value)}
          />
        </label>
        <label>
          {strings.settings.timeAtCtrl}
          <input
            type="number"
            id="avgCtrlTimePicker"
            name="avgCtrlTimePicker"
            min="0"
            max="10"
            step="0.25"
            value={avgCtrlTime}
            onChange={(e) => updateAvgCtrlTime(e.target.value)}
          />
        </label>
      </ControlPanel>
    </>
  );
}
