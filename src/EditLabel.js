import React, { useState } from "react";
import EditableLabel from "editable-label-react";

const EditLabel = ({ link }) => {
  const [text, setText] = useState(link);

  return (
    <div className="label-wrapper">
      <EditableLabel
        labelClassName="myLabelClass"
        inputClassName="myInputClass"
        inputWidth="75px"
        inputHeight="15px"
        inputMaxLength={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default EditLabel;
