import { useState } from 'react';

const useChangeRadioGroup = (radioDefault) => {
  const [value, setValue] = useState(radioDefault);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, setValue, handleChange };
};

export default useChangeRadioGroup;
