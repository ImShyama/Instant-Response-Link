import { useState } from "react";
import { SketchPicker } from "react-color";

export default function ColorPicker() {
  const [color, setColor] = useState("lightblue");
  const [hidden, setHidden] = useState(false);

  const pickerStyle = {
    default: {
      picker: {
        position: "absolute",
        bottom: "0",
        // left: "55%",
        left: "0",
        top: "-200px",
      },
    },
  };
  return (
    <div>
      <div>
        {hidden && (
          <SketchPicker
            styles={pickerStyle}
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        )}

        <button
          type="button"
          className="btn btn-primary my-2"
          // style={{ fontSize: "14px", padding: "5px 10px" }}
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? "Close Color Picker" : "Open Color Picker"}
        </button>
      </div>
    </div>
  );
}
