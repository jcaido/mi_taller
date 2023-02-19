import { useState } from 'react';

const useNavigationButton = (label) => {
  const [value, setValue] = useState(label);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return { value, setValue, handleChange };
};

export default useNavigationButton;
