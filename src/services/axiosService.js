import axios from 'axios';

export const nuevoCodigoPostal = (codigo, localidad, provincia) => {
  const body = {
    codigo,
    localidad,
    provincia,
  };

  return axios.post('http://localhost:8080/api/codigosPostales', body);
};

export const obtenerCodigosPostales = () => axios.get('http://localhost:8080/api/codigosPostales');

export const obtenerCodigoPostalPorCodigo = (codigo) => axios.get(`http://localhost:8080/api/codigosPostales/codigo/${codigo}`);

export const obtenerCodigosPostalesPorLocalidad = (localidad) => axios.get(`http://localhost:8080/api/codigosPostales/localidad/${localidad}`);

export const obtenerCodigosPostalesPorProvincia = (provincia) => axios.get(`http://localhost:8080/api/codigosPostales/provincia/${provincia}`);

export const modificarCodigoPostal = (id, codigo, localidad, provincia) => {
  const body = {
    id,
    codigo,
    localidad,
    provincia,
  };
  return axios.put('http://localhost:8080/api/codigosPostales', body);
};

export const eliminarCodigoPostal = (id) => axios.delete(`http://localhost:8080/api/codigosPostales/${id}`);

export const nuevoPropietario = (
  nombre,
  primerApellido,
  segundoApellido,
  dni,
  domicilio,
  idCodigoPostal,
) => {
  const body = {
    nombre,
    primerApellido,
    segundoApellido,
    dni,
    domicilio,
  };

  return axios.post(`http://localhost:8080/api/propietarios/${idCodigoPostal}`, body);
};

export const obtenerPropietarios = () => axios.get('http://localhost:8080/api/propietarios/parcial');

export const obtenerPropietarioPorDni = (dni) => axios.get(`http://localhost:8080/api/propietarios/dni/${dni}`);

export const obtenerPropietariosPorPrimerApellido = (primerApellido) => axios.get(`http://localhost:8080/api/propietarios/primer-apellido/parcial/${primerApellido}`);

export const obtenerPropietariosPorCodigoPostal = (idCodigoPostal) => axios.get(`http://localhost:8080/api/propietarios/codigo_postal/parcial/${idCodigoPostal}`);

export const modificarPropietario = (
  id,
  nombre,
  primerApellido,
  segundoApellido,
  dni,
  domicilio,
  idCodigoPostal,
) => {
  const body = {
    id,
    nombre,
    primerApellido,
    segundoApellido,
    dni,
    domicilio,
  };
  return axios.put(`http://localhost:8080/api/propietarios/${idCodigoPostal}`, body);
};

export const eliminarPropietario = (id) => axios.delete(`http://localhost:8080/api/propietarios/${id}`);

export const nuevoVehiculo = (matricula, marca, modelo, color, idPropietario) => {
  const body = {
    matricula,
    marca,
    modelo,
    color,
  };

  return axios.post(`http://localhost:8080/api/vehiculos/${idPropietario}`, body);
};

export const obtenerVehiculosPorMatricula = (matricula) => axios.get(`http://localhost:8080/api/vehiculos/matricula/${matricula}`);

export const obtenerVehiculos = () => axios.get('http://localhost:8080/api/vehiculos/parcial');

export const obtenerVehiculosPorMarcaModelo = (marcaModelo) => axios.get(`http://localhost:8080/api/vehiculos/marca-modelo/parcial/${marcaModelo}`);

export const obtenerVehiculosPorPropietario = (idPropietario) => axios.get(`http://localhost:8080/api/vehiculos/propietario/parcial/${idPropietario}`);

export const modificarVehiculo = (
  id,
  matricula,
  marca,
  modelo,
  color,
  idPropietario,
) => {
  const body = {
    id,
    matricula,
    marca,
    modelo,
    color,
  };
  return axios.put(`http://localhost:8080/api/vehiculos/${idPropietario}`, body);
};

export const eliminarVehiculo = (id) => axios.delete(`http://localhost:8080/api/vehiculos/${id}`);

export const nuevaOrdenReparacion = (fechaApertura, descripcion, kilometros, idMatricula) => {
  const body = {
    fechaApertura,
    descripcion,
    kilometros,
    cerrada: false,
  };

  return axios.post(`http://localhost:8080/api/ordenesReparacion/${idMatricula}`, body);
};

export const obtenerOrdenesReparacionAbiertas = () => axios.get('http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false');

export const obtenerOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false/${fechaApertura}`);

export const obtenerOrdenesReparacionAbiertasPorVehiculo = (idVehiculo) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial-vehiculo/false/${idVehiculo}`);

export const obtenerOrdenReparacionPorId = (id) => axios.get(`http://localhost:8080/api/ordenesReparacion/parcial/${id}`);

export const obtenerOrdenReparacionPorIdCompleta = (id) => axios.get(`http://localhost:8080/api/ordenesReparacion/${id}`);

export const modificarOrdenReparacion = (
  id,
  fechaApertura,
  descripcion,
  kilometros,
  idVehiculo,
) => {
  const body = {
    id,
    fechaApertura,
    descripcion,
    kilometros,
  };

  return axios.put(`http://localhost:8080/api/ordenesReparacion/${idVehiculo}`, body);
};

export const eliminarOrdenReparacion = (id) => axios.delete(`http://localhost:8080/api/ordenesReparacion/${id}`);
