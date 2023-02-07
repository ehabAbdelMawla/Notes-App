import React, { useState } from "react";
import { deleteItem as deleteMethod, updateColor } from "../utils/methods";
import swal from "sweetalert";
import TrashImage from "../assets/trash.png";
import brushImage from "../assets/brush.png";
import { TwitterPicker } from "react-color";

function Note({ item: { id, description, color }, updateData }) {
  const [isColorPickerVisible, setVisability] = useState(false);
  const [bgColor, setColor] = useState(color ?? "#52B5D6");
  const deleteItem = () => {
    swal({
      title: "Delete?",
      text: "Are You Sure You Want To Delete This Note",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMethod(id);
        updateData();
      }
    });
  };
  return (
    <div className="item">
      <div className="item-content">
        <div
          className={`color-picker-container ${
            isColorPickerVisible ? "show" : ""
          }`}
        >
          <TwitterPicker
            triangle="hide"
            colors={[
              "#fcb900",
              "#7bdcb5",
              "#8ed1fc",
              "#0693e3",
              "#eb144c",
              "#9900ef",
              "#ff6900",
              "#52B5D6",
            ]}
            color={bgColor}
            onChangeComplete={(e) => {
              setColor(e.hex + "");
              setVisability(false);
              updateColor(id, e.hex);
            }}
            width="100%"
          />
        </div>
        <div
          className="note"
          style={{ backgroundColor: bgColor }}
          data-aos="zoom-in"
          data-aos-once="true"
        >
          <p className="description">{description}</p>
          <button className="trash-button" onClick={deleteItem}>
            <img src={TrashImage} alt="Trash Icon" />
          </button>
          <button
            className="color-button"
            onClick={() => {
              setVisability(!isColorPickerVisible);
            }}
          >
            <img src={brushImage} alt="brush Icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Note);
