import * as React from "react";
import styled from "styled-components";

const ControlPanel = styled.div`
  background-color: ${(props) => props.theme.colors.gray_med_translucent};
  color: ${(props) => props.theme.colors.blue_dark};
  padding: 15px;
  margin: 20px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  line-height: 1;
  strong {
    font-weight: 800;
  }
  label {
    font-weight: 400;
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
`;
const ControlRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 0;

  input {
  }
  span {
    text-align: center;
  }
`;

export default function GeneralControls(props) {
  const {
    avgSpeed,
    setAvgSpeed,
    avgCtrlTime,
    setAvgCtrlTime,
    startWave,
    setStartWave,
  } = props;
  return (
    <ControlPanel>
      <strong>General settings</strong>
      <label>
        Starting Wave
        <select
          id="wavePicker"
          value={startWave}
          onChange={(e) => setStartWave(e.target.value)}
        >
          <option value="">Select One</option>
          <option value="A">A – 16:00</option>
          <option value="B">B – 16:15</option>
          <option value="C">C – 16:30</option>
          <option value="D">D – 16:45</option>
          <option value="E">E – 17:00</option>
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
          <option value="V">V – 04:45</option>
          <option value="W">W – 05:00</option>
          <option value="X">X – 05:15</option>
          <option value="Y">Y – 05:30</option>
          <option value="Z">Z – 05:45</option>
          <option value="+">+ – 06:00</option>
        </select>
      </label>
      <label>
        Speed (km/h)
        <input
          type="number"
          id="avgSpeedPicker"
          name="avgSpeedPicker"
          min="10"
          max="40"
          value={avgSpeed}
          onChange={(e) => setAvgSpeed(e.target.value)}
        />
      </label>
      <label>
        Time at Controls (hours)
        <input
          type="number"
          id="avgCtrlTimePicker"
          name="avgCtrlTimePicker"
          min="0"
          max="10"
          step="0.25"
          value={avgCtrlTime}
          onChange={(e) => setAvgCtrlTime(e.target.value)}
        />
      </label>
    </ControlPanel>
  );
}
