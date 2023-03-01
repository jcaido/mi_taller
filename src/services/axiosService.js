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

export const obtenerOrdenesReparacionAbiertasSort = () => axios.get('http://localhost:8080/api/ordenesReparacion/cerrada-parcial-sort/false');

export const obtenerOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false/${fechaApertura}`);

export const obtenerOrdenesReparacionAbiertasPorVehiculo = (idVehiculo) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial-vehiculo/false/${idVehiculo}`);
export const obtenerOrdenesReparacionCerradasPorVehiculo = (idVehiculo) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-vehiculo/true/${idVehiculo}`);

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

export const obtenerPiezaPorReferencia = (referencia) => axios.get(`http://localhost:8080/api/piezas/referencia/${referencia}`);

export const obtenerPiezaPorNombre = (nombre) => axios.get(`http://localhost:8080/api/piezas/nombre/${nombre}`);

export const nuevaPiezaReparacion = (idOrden, idPieza, cantidad) => {
  const body = {
    cantidad,
  };
  return axios.post(`http://localhost:8080/api/piezas-reparacion/${idOrden}/${idPieza}`, body);
};

export const eliminarPiezaReparacion = (id) => axios.delete(`http://localhost:8080/api/piezas-reparacion/${id}`);

export const modificarOrdenReparacionHoras = (idOrden, horas) => {
  const body = {
    id: idOrden,
    horas,
  };
  return axios.put('http://localhost:8080/api/ordenesReparacion/horas', body);
};

export const modificarOrdenReparacionCierre = (idOrden, fechaCierre) => {
  const body = {
    id: idOrden,
    fechaCierre,
  };
  return axios.put('http://localhost:8080/api/ordenesReparacion/cierre', body);
};

export const modificarOrdenReparacionAbrir = (idOrden) => {
  const body = {
    id: idOrden,
  };
  return axios.put('http://localhost:8080/api/ordenesReparacion/abrir', body);
};

export const obtenerOrdenesCerradasEntreFechas = (fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada/true/${fechaInicial}/${fechaFinal}`);

export const establecerPrecioManoDeObra = (precioHoraClienteTaller) => {
  const body = {
    precioHoraClienteTaller,
  };

  return axios.post('http://localhost:8080/api/mano-de-obra', body);
};

export const obtenerPrecioManDeObraActual = () => axios.get('http://localhost:8080/api/mano-de-obra/precio-actual/true');

export const obtenerPreciosManoDeObra = () => axios.get('http://localhost:8080/api/mano-de-obra');

export const obtenerProveedores = () => axios.get('http://localhost:8080/api/proveedores/parcial');

export const nuevoProveedor = (
  nombre,
  dniCif,
  domicilio,
  idCodigoPostal,
) => {
  const body = {
    nombre,
    dniCif,
    domicilio,
  };

  return axios.post(`http://localhost:8080/api/proveedores/${idCodigoPostal}`, body);
};

export const obtenerProveedorPorDniCif = (dniCif) => axios.get(`http://localhost:8080/api/proveedores/dni-cif/${dniCif}`);

export const obtenerProveedoresPorNombre = (nombre) => axios.get(`http://localhost:8080/api/proveedores/nombre-parcial/${nombre}`);

export const modificarProveedor = (
  id,
  nombre,
  dniCif,
  domicilio,
  idCodigoPostal,
) => {
  const body = {
    id,
    nombre,
    dniCif,
    domicilio,
  };
  return axios.put(`http://localhost:8080/api/proveedores/${idCodigoPostal}`, body);
};

export const obtenerPiezas = () => axios.get('http://localhost:8080/api/piezas');

export const nuevaPieza = (
  referencia,
  nombre,
  precio,
) => {
  const body = {
    referencia,
    nombre,
    precio,
  };

  return axios.post('http://localhost:8080/api/piezas', body);
};

export const modificarPieza = (
  id,
  referencia,
  nombre,
  precio,
) => {
  const body = {
    id,
    referencia,
    nombre,
    precio,
  };
  return axios.put('http://localhost:8080/api/piezas', body);
};

export const eliminarProveedor = (id) => axios.delete(`http://localhost:8080/api/proveedores/${id}`);

export const eliminarPieza = (id) => axios.delete(`http://localhost:8080/api/piezas/${id}`);

export const obtenerAlbaranesEntrada = () => axios.get('http://localhost:8080/api/albaranProveedor/parcial');

export const nuevoAlbaranEntrada = (fechaAlbaran, numeroAlbaran, idProveedor) => {
  const body = {
    fechaAlbaran,
    numeroAlbaran,
  };

  return axios.post(`http://localhost:8080/api/albaranProveedor/${idProveedor}`, body);
};

export const obtenerAlbaranPorId = (id) => axios.get(`http://localhost:8080/api/albaranProveedor/${id}`);

export const eliminarEntradaPieza = (id) => axios.delete(`http://localhost:8080/api/entrada-pieza/${id}`);

export const nuevaEntradaPieza = (cantidad, precioEntrada, idPieza, idAlbaranProveedor) => {
  const body = {
    cantidad,
    precioEntrada,
  };

  return axios.post(`http://localhost:8080/api/entrada-pieza/${idPieza}/${idAlbaranProveedor}`, body);
};

export const modificarAlbaranEntradas = (
  id,
  fechaAlbaran,
  numeroAlbaran,
  idProveedor,
) => {
  const body = {
    id,
    fechaAlbaran,
    numeroAlbaran,
  };
  return axios.put(`http://localhost:8080/api/albaranProveedor/${idProveedor}`, body);
};
