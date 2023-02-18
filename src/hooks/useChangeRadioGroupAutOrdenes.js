import { useState, useContext } from 'react';
import { AutorizacionOrdenesContext } from '../pages/TallerAutorizacionOrdenes';

const useChangeRadioGroupAutOrdenes = (radioDefault) => {
  const {
    CerrarTablaOrdenesReparacionAbiertas,
    CerrarAutorizacionPdf,
  } = useContext(AutorizacionOrdenesContext);

  const [value, setValue] = useState(radioDefault);

  const handleChangeCierre = (e) => {
    setValue(e.target.value);
    CerrarTablaOrdenesReparacionAbiertas();
    CerrarAutorizacionPdf();
  };

  return {
    value,
    setValue,
    handleChangeCierre,
  };
};

export default useChangeRadioGroupAutOrdenes;
