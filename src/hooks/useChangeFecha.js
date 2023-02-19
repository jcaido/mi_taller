import { useState } from 'react';

const useChangeFecha = (InitialValue) => {
  const [value, setValue] = useState(InitialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return { value, setValue, handleChange };
};

export default useChangeFecha;
