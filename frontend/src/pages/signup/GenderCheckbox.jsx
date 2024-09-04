import React from "react";

const GenderCheckbox = ({ handleCheckboxChange,selectedGender }) => {
  return (
    <div className="flex justify-evenly mt-2">
      <div className="form-control">
        <label htmlFor="male-gender" className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            name="gender"
            id="male-gender"
            type="checkbox"
            className={`checkbox border-slate-900 ${selectedGender==="male" ? "selected" : ""}`}
            checked={selectedGender==="male"}
            onChange={(e)=>{handleCheckboxChange("male")}}
          />
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="female-gender" className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            name="gender"
            id="female-gender"
            type="checkbox"
            className={`checkbox border-slate-900 ${selectedGender==="female" ? "selected" : ""}`}
            checked={selectedGender==="female"}
            onChange={(e)=>{handleCheckboxChange("female")}}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
