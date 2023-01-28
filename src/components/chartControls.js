import * as React from "react";

export default function ChartControls(props) {
  return (
    <>
      <label>
        Starting Wave
        <select
          id="wavePicker"
          value={props.startWave}
          onChange={(e) => props.setStartWave(e.target.value)}
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
          {/* <option value="O">O – 19:30</option> */}
          <option value="P">P – 19:30</option>
          <option value="Q">Q – 19:45</option>
          <option value="R">R – 20:00</option>
          <option value="S">S – 20:15</option>
          <option value="T">T – 20:30</option>
          <option value="U">U – 20:45</option>
          <option value="V">V – 21:00</option>
          <option value="W">W – 04:45</option>
          <option value="X">X – 05:00</option>
          <option value="Y">Y – 05:15</option>
          <option value="Z">Z – 05:30</option>
        </select>
      </label>
      <label>
        Average Speed (km/h)
        <input
          type="number"
          id="avgSpeedPicker"
          name="avgSpeedPicker"
          min="10"
          max="40"
          value={props.avgSpeed}
          onChange={(e) => props.setAvgSpeed(e.target.value)}
        />
      </label>
    </>
  );
}
