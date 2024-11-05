import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex'>
        <div className='form-control mt-2'>
        <label className={`cursor-pointer label gap-2 ${selectedGender === "male" ? "selected":""}`}>
            <span className='label-text'>Male</span>
            <input type='radio' className='radio radio-success'
            checked={selectedGender==="male"}
            onChange={()=> onCheckboxChange("male")}/>
        </label>
        </div>

        <div className='form-control mt-2'>
        <label className={`cursor-pointer label gap-2 ${selectedGender === "female" ? "selected":""}`}>
            <span className='label-text'>Female</span>
            <input type='radio' className='radio radio-success'
                checked={selectedGender==="female"}
                onChange={()=> onCheckboxChange("female")}/>
        </label>

        </div>

    </div>
  )
}

export default GenderCheckbox