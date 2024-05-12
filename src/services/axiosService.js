import axios from 'axios';

// const URL_BASE = 'https://demo-render-1-mh2c.onrender.com';
const URL_BASE = 'https://tallerh2render.onrender.com';

// ====== CODIGO POSTAL ======================================================================
export const nuevoCodigoPostal = (codigo, localidad, provincia) => {
  const body = {
    codigo,
    localidad,
    provincia,
  };

  return axios.post(`${URL_BASE}/api/codigosPostales`, body);
};

export const obtenerCodigosPostales = () => axios.get(`${URL_BASE}/api/codigosPostales`);

export const obtenerCodigoPostalPorCodigo = (codigo) => axios.get(`${URL_BASE}/api/codigosPostales/codigo/${codigo}`);

export const obtenerCodigosPostalesPorLocalidad = (localidad) => axios.get(`${URL_BASE}/api/codigosPostales/localidad/${localidad}`);

export const obtenerCodigosPostalesPorProvincia = (provincia) => axios.get(`${URL_BASE}/api/codigosPostales/provincia/${provincia}`);

export const modificarCodigoPostal = (id, codigo, localidad, provincia) => {
  const body = {
    id,
    codigo,
    localidad,
    provincia,
  };

  return axios.put(`${URL_BASE}/api/codigosPostales`, body);
};

export const eliminarCodigoPostal = (id) => axios.delete(`${URL_BASE}/api/codigosPostales/${id}`);

// ========= PROPIETARIO ===========================================================================
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

  return axios.post(`${URL_BASE}/api/propietarios/${idCodigoPostal}`, body);
};

export const obtenerPropietarios = () => axios.get(`${URL_BASE}/api/propietarios/parcial`);

export const obtenerPropietarioPorDni = (dni) => axios.get(`${URL_BASE}/api/propietarios/dni/${dni}`);

export const obtenerPropietariosPorPrimerApellido = (primerApellido) => axios.get(`${URL_BASE}/api/propietarios/primer-apellido/parcial/${primerApellido}`);

export const obtenerPropietariosPorCodigoPostal = (idCodigoPostal) => axios.get(`${URL_BASE}/api/propietarios/codigo_postal/parcial/${idCodigoPostal}`);

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
  return axios.put(`${URL_BASE}/api/propietarios/${idCodigoPostal}`, body);
};

export const eliminarPropietario = (id) => axios.delete(`${URL_BASE}/api/propietarios/${id}`);

// ============ VEHICULO ===========================================================================
export const nuevoVehiculo = (matricula, marca, modelo, color, idPropietario) => {
  const body = {
    matricula,
    marca,
    modelo,
    color,
  };

  return axios.post(`${URL_BASE}/api/vehiculos/${idPropietario}`, body);
};

export const obtenerVehiculosPorMatricula = (matricula) => axios.get(`${URL_BASE}/api/vehiculos/matricula/${matricula}`);

export const obtenerVehiculos = () => axios.get(`${URL_BASE}/api/vehiculos/parcial`);

export const obtenerVehiculosPorMarcaModelo = (marcaModelo) => axios.get(`${URL_BASE}/api/vehiculos/marca-modelo/parcial/${marcaModelo}`);

export const obtenerVehiculosPorPropietario = (idPropietario) => axios.get(`${URL_BASE}/api/vehiculos/propietario/parcial/${idPropietario}`);

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

  return axios.put(`${URL_BASE}/api/vehiculos/${idPropietario}`, body);
};

export const eliminarVehiculo = (id) => axios.delete(`${URL_BASE}/api/vehiculos/${id}`);

// ================ ORDEN REPARACION ===============================================================
export const nuevaOrdenReparacion = (fechaApertura, descripcion, kilometros, idMatricula) => {
  const body = {
    fechaApertura,
    descripcion,
    kilometros,
    cerrada: false,
    facturada: false,
  };

  // return axios.post(`http://localhost:8080/api/ordenesReparacion/${idMatricula}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/${idMatricula}`, body);
  return axios.post(`${URL_BASE}/api/ordenesReparacion/${idMatricula}`, body);
};

// export const obtenerOrdenesReparacionAbiertas = () => axios.get('http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false');
// export const obtenerOrdenesReparacionAbiertas = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada-parcial/false');
export const obtenerOrdenesReparacionAbiertas = () => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada-parcial/false`);

// export const obtenerOrdenesReparacionAbiertasSort = () => axios.get('http://localhost:8080/api/ordenesReparacion/cerrada-parcial-sort/false');
// export const obtenerOrdenesReparacionAbiertasSort = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada-parcial-sort/false');
export const obtenerOrdenesReparacionAbiertasSort = () => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada-parcial-sort/false`);

// export const obtenerOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false/${fechaApertura}`);
// export const obtenerOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada-parcial/false/${fechaApertura}`);
export const obtenerOrdenesReparacionAbiertasPorFechaApertura = (fechaApertura) => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada-parcial/false/${fechaApertura}`);

// export const obtenerOrdenesReparacionAbiertasPorVehiculo = (idVehiculo) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-parcial-vehiculo/false/${idVehiculo}`);
// export const obtenerOrdenesReparacionAbiertasPorVehiculo = (idVehiculo) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada-parcial-vehiculo/false/${idVehiculo}`);
export const obtenerOrdenesReparacionAbiertasPorVehiculo = (idVehiculo) => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada-parcial-vehiculo/false/${idVehiculo}`);

// export const obtenerOrdenesReparacionCerradasPorVehiculo = (idVehiculo) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada-vehiculo/true/${idVehiculo}`);
// export const obtenerOrdenesReparacionCerradasPorVehiculo = (idVehiculo) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada-vehiculo/true/${idVehiculo}`);
export const obtenerOrdenesReparacionCerradasPorVehiculo = (idVehiculo) => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada-vehiculo/true/${idVehiculo}`);

// export const obtenerOrdenReparacionPorId = (id) => axios.get(`http://localhost:8080/api/ordenesReparacion/parcial/${id}`);
// export const obtenerOrdenReparacionPorId = (id) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/parcial/${id}`);
export const obtenerOrdenReparacionPorId = (id) => axios.get(`${URL_BASE}/api/ordenesReparacion/parcial/${id}`);

// export const obtenerOrdenReparacionPorIdCompleta = (id) => axios.get(`http://localhost:8080/api/ordenesReparacion/${id}`);
// export const obtenerOrdenReparacionPorIdCompleta = (id) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/${id}`);
export const obtenerOrdenReparacionPorIdCompleta = (id) => axios.get(`${URL_BASE}/api/ordenesReparacion/${id}`);

// export const obtenerOrdenesReparacionCerradasPendientesFacturas = () => axios.get('http://localhost:8080/api/ordenesReparacion/cerradas-ptes-facturar');
// export const obtenerOrdenesReparacionCerradasPendientesFacturas = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerradas-ptes-facturar');
export const obtenerOrdenesReparacionCerradasPendientesFacturas = () => axios.get(`${URL_BASE}/api/ordenesReparacion/cerradas-ptes-facturar`);

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

  //  return axios.put(`http://localhost:8080/api/ordenesReparacion/${idVehiculo}`, body);
  // return axios.put(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/${idVehiculo}`, body);
  return axios.put(`${URL_BASE}/api/ordenesReparacion/${idVehiculo}`, body);
};

// export const eliminarOrdenReparacion = (id) => axios.delete(`http://localhost:8080/api/ordenesReparacion/${id}`);
// export const eliminarOrdenReparacion = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/${id}`);
export const eliminarOrdenReparacion = (id) => axios.delete(`${URL_BASE}/api/ordenesReparacion/${id}`);

// export const obtenerPiezaPorReferencia = (referencia) => axios.get(`http://localhost:8080/api/piezas/referencia/${referencia}`);
// export const obtenerPiezaPorReferencia = (referencia) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/piezas/referencia/${referencia}`);
export const obtenerPiezaPorReferencia = (referencia) => axios.get(`${URL_BASE}/api/piezas/referencia/${referencia}`);

// export const obtenerPiezaPorNombre = (nombre) => axios.get(`http://localhost:8080/api/piezas/nombre/${nombre}`);
// export const obtenerPiezaPorNombre = (nombre) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/piezas/nombre/${nombre}`);
export const obtenerPiezaPorNombre = (nombre) => axios.get(`${URL_BASE}/api/piezas/nombre/${nombre}`);

export const nuevaPiezaReparacion = (idOrden, idPieza, cantidad) => {
  const body = {
    cantidad,
  };
  // return axios.post(`http://localhost:8080/api/piezas-reparacion/${idOrden}/${idPieza}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/piezas-reparacion/${idOrden}/${idPieza}`, body);
  return axios.post(`${URL_BASE}/api/piezas-reparacion/${idOrden}/${idPieza}`, body);
};

// export const eliminarPiezaReparacion = (id) => axios.delete(`http://localhost:8080/api/piezas-reparacion/${id}`);
// export const eliminarPiezaReparacion = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/piezas-reparacion/${id}`);
export const eliminarPiezaReparacion = (id) => axios.delete(`${URL_BASE}/api/piezas-reparacion/${id}`);

export const modificarOrdenReparacionHoras = (idOrden, horas) => {
  const body = {
    id: idOrden,
    horas,
  };
  // return axios.put('http://localhost:8080/api/ordenesReparacion/horas', body);
  // return axios.put('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/horas', body);
  return axios.put(`${URL_BASE}/api/ordenesReparacion/horas`, body);
};

export const modificarOrdenReparacionCierre = (idOrden, fechaCierre) => {
  const body = {
    id: idOrden,
    fechaCierre,
  };
  // return axios.put('http://localhost:8080/api/ordenesReparacion/cierre', body);
  // return axios.put('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cierre', body);
  return axios.put(`${URL_BASE}/api/ordenesReparacion/cierre`, body);
};

export const modificarOrdenReparacionAbrir = (idOrden) => {
  const body = {
    id: idOrden,
  };
  // return axios.put('http://localhost:8080/api/ordenesReparacion/abrir', body);
  // return axios.put('https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/abrir', body);
  return axios.put(`${URL_BASE}/api/ordenesReparacion/abrir`, body);
};

// export const obtenerOrdenesCerradasEntreFechas = (fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/ordenesReparacion/cerrada/true/${fechaInicial}/${fechaFinal}`);
// export const obtenerOrdenesCerradasEntreFechas = (fechaInicial, fechaFinal) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/ordenesReparacion/cerrada/true/${fechaInicial}/${fechaFinal}`);
export const obtenerOrdenesCerradasEntreFechas = (fechaInicial, fechaFinal) => axios.get(`${URL_BASE}/api/ordenesReparacion/cerrada/true/${fechaInicial}/${fechaFinal}`);

// ============================= MANO DE OBRA ======================================================
export const establecerPrecioManoDeObra = (precioHoraClienteTaller) => {
  const body = {
    precioHoraClienteTaller,
  };

  // return axios.post('http://localhost:8080/api/mano-de-obra', body);
  // return axios.post('https://demo-render-1-mh2c.onrender.com/api/mano-de-obra', body);
  return axios.post(`${URL_BASE}/api/mano-de-obra`, body);
};

//  export const obtenerPrecioManDeObraActual = () => axios.get('http://localhost:8080/api/mano-de-obra/precio-actual/true');
// export const obtenerPrecioManDeObraActual = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/mano-de-obra/precio-actual/true');
export const obtenerPrecioManDeObraActual = () => axios.get(`${URL_BASE}/api/mano-de-obra/precio-actual/true`);

// export const obtenerPreciosManoDeObra = () => axios.get('http://localhost:8080/api/mano-de-obra');
// export const obtenerPreciosManoDeObra = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/mano-de-obra');
export const obtenerPreciosManoDeObra = () => axios.get(`${URL_BASE}/api/mano-de-obra`);

// export const obtenerProveedores = () => axios.get('http://localhost:8080/api/proveedores/parcial');
// export const obtenerProveedores = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/proveedores/parcial');
export const obtenerProveedores = () => axios.get(`${URL_BASE}/api/proveedores/parcial`);

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

  // return axios.post(`http://localhost:8080/api/proveedores/${idCodigoPostal}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/proveedores/${idCodigoPostal}`, body);
  return axios.post(`${URL_BASE}/api/proveedores/${idCodigoPostal}`, body);
};

// export const obtenerProveedorPorDniCif = (dniCif) => axios.get(`http://localhost:8080/api/proveedores/dni-cif/${dniCif}`);
// export const obtenerProveedorPorDniCif = (dniCif) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/proveedores/dni-cif/${dniCif}`);
export const obtenerProveedorPorDniCif = (dniCif) => axios.get(`${URL_BASE}/api/proveedores/dni-cif/${dniCif}`);

// export const obtenerProveedoresPorNombre = (nombre) => axios.get(`http://localhost:8080/api/proveedores/nombre-parcial/${nombre}`);
// export const obtenerProveedoresPorNombre = (nombre) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/proveedores/nombre-parcial/${nombre}`);
export const obtenerProveedoresPorNombre = (nombre) => axios.get(`${URL_BASE}/api/proveedores/nombre-parcial/${nombre}`);

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
  // return axios.put(`http://localhost:8080/api/proveedores/${idCodigoPostal}`, body);
  // return axios.put(`https://demo-render-1-mh2c.onrender.com/api/proveedores/${idCodigoPostal}`, body);
  return axios.put(`${URL_BASE}/api/proveedores/${idCodigoPostal}`, body);
};

// export const obtenerPiezas = () => axios.get('http://localhost:8080/api/piezas');
// export const obtenerPiezas = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/piezas');
export const obtenerPiezas = () => axios.get(`${URL_BASE}/api/piezas`);

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

  // return axios.post('http://localhost:8080/api/piezas', body);
  // return axios.post('https://demo-render-1-mh2c.onrender.com/api/piezas', body);
  return axios.post(`${URL_BASE}/api/piezas`, body);
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
  // return axios.put('http://localhost:8080/api/piezas', body);
  // return axios.put('https://demo-render-1-mh2c.onrender.com/api/piezas', body);
  return axios.put(`${URL_BASE}/api/piezas`, body);
};

// export const eliminarProveedor = (id) => axios.delete(`http://localhost:8080/api/proveedores/${id}`);
// export const eliminarProveedor = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/proveedores/${id}`);
export const eliminarProveedor = (id) => axios.delete(`${URL_BASE}/api/proveedores/${id}`);

// export const eliminarPieza = (id) => axios.delete(`http://localhost:8080/api/piezas/${id}`);
// export const eliminarPieza = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/piezas/${id}`);
export const eliminarPieza = (id) => axios.delete(`${URL_BASE}/api/piezas/${id}`);

// export const obtenerAlbaranesEntrada = () => axios.get('http://localhost:8080/api/albaranProveedor/parcial');
// export const obtenerAlbaranesEntrada = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/parcial');
export const obtenerAlbaranesEntrada = () => axios.get(`${URL_BASE}/api/albaranProveedor/parcial`);

export const nuevoAlbaranEntrada = (fechaAlbaran, numeroAlbaran, idProveedor) => {
  const body = {
    fechaAlbaran,
    numeroAlbaran,
  };

  // return axios.post(`http://localhost:8080/api/albaranProveedor/${idProveedor}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/${idProveedor}`, body);
  return axios.post(`${URL_BASE}/api/albaranProveedor/${idProveedor}`, body);
};

// export const obtenerAlbaranPorId = (id) => axios.get(`http://localhost:8080/api/albaranProveedor/${id}`);
// export const obtenerAlbaranPorId = (id) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/${id}`);
export const obtenerAlbaranPorId = (id) => axios.get(`${URL_BASE}/api/albaranProveedor/${id}`);

// export const eliminarEntradaPieza = (id) => axios.delete(`http://localhost:8080/api/entrada-pieza/${id}`);
// export const eliminarEntradaPieza = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/entrada-pieza/${id}`);
export const eliminarEntradaPieza = (id) => axios.delete(`${URL_BASE}/api/entrada-pieza/${id}`);

export const nuevaEntradaPieza = (cantidad, precioEntrada, idPieza, idAlbaranProveedor) => {
  const body = {
    cantidad,
    precioEntrada,
  };

  // return axios.post(`http://localhost:8080/api/entrada-pieza/${idPieza}/${idAlbaranProveedor}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/entrada-pieza/${idPieza}/${idAlbaranProveedor}`, body);
  return axios.post(`${URL_BASE}/api/entrada-pieza/${idPieza}/${idAlbaranProveedor}`, body);
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
  // return axios.put(`http://localhost:8080/api/albaranProveedor/${idProveedor}`, body);
  // return axios.put(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/${idProveedor}`, body);
  return axios.put(`${URL_BASE}/api/albaranProveedor/${idProveedor}`, body);
};

// export const eliminarAlbaranEntradas = (id) => axios.delete(`http://localhost:8080/api/albaranProveedor/${id}`);
// export const eliminarAlbaranEntradas = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/${id}`);
export const eliminarAlbaranEntradas = (id) => axios.delete(`${URL_BASE}/api/albaranProveedor/${id}`);

// export const obtenerInventarioActualAlmacen = () => axios.get('http://localhost:8080/api/almacen/inventario');
// export const obtenerInventarioActualAlmacen = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/almacen/inventario');
export const obtenerInventarioActualAlmacen = () => axios.get(`${URL_BASE}/api/almacen/inventario`);

// export const obtenerInventarioFecha = (fecha) => axios.get(`http://localhost:8080/api/almacen/inventario/${fecha}`);
// export const obtenerInventarioFecha = (fecha) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/almacen/inventario/${fecha}`);
export const obtenerInventarioFecha = (fecha) => axios.get(`${URL_BASE}/api/almacen/inventario/${fecha}`);

// export const obtenerMovimientosPieza = (referencia) => axios.get(`http://localhost:8080/api/almacen/movimientos/${referencia}`);
// export const obtenerMovimientosPieza = (referencia) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/almacen/movimientos/${referencia}`);
export const obtenerMovimientosPieza = (referencia) => axios.get(`${URL_BASE}/api/almacen/movimientos/${referencia}`);

export const nuevaFacturaProveedor = (fechaFactura, numeroFactura, tipoIVA, idProveedor) => {
  const body = {
    fechaFactura,
    numeroFactura,
    tipoIVA,
  };

  // return axios.post(`http://localhost:8080/api/facturaProveedor/${idProveedor}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${idProveedor}`, body);
  return axios.post(`${URL_BASE}/api/facturaProveedor/${idProveedor}`, body);
};

// export const obtenerAlbaranesNoFacturadosProveedor = (idProveedor) => axios.get(`http://localhost:8080/api/albaranProveedor/no-facturados/${idProveedor}`);
// export const obtenerAlbaranesNoFacturadosProveedor = (idProveedor) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/no-facturados/${idProveedor}`);
export const obtenerAlbaranesNoFacturadosProveedor = (idProveedor) => axios.get(`${URL_BASE}/api/albaranProveedor/no-facturados/${idProveedor}`);

// export const facturarAlbaranProveedor = (idAlbaran, idFactura) => axios.put(`http://localhost:8080/api/albaranProveedor/facturarAlbaran/${idAlbaran}/${idFactura}`);
// export const facturarAlbaranProveedor = (idAlbaran, idFactura) => axios.put(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/facturarAlbaran/${idAlbaran}/${idFactura}`);
export const facturarAlbaranProveedor = (idAlbaran, idFactura) => axios.put(`${URL_BASE}/api/albaranProveedor/facturarAlbaran/${idAlbaran}/${idFactura}`);

// export const noFacturarAlbaranProveedor = (idAlbaran) => axios.put(`http://localhost:8080/api/albaranProveedor/noFacturarAlbaran/${idAlbaran}`);
// export const noFacturarAlbaranProveedor = (idAlbaran) => axios.put(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/noFacturarAlbaran/${idAlbaran}`);
export const noFacturarAlbaranProveedor = (idAlbaran) => axios.put(`${URL_BASE}/api/albaranProveedor/noFacturarAlbaran/${idAlbaran}`);

// export const obtenerAlbaranesAsignadosAFactura = (idFactura) => axios.get(`http://localhost:8080/api/albaranProveedor/factura/${idFactura}`);
// export const obtenerAlbaranesAsignadosAFactura = (idFactura) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/albaranProveedor/factura/${idFactura}`);
export const obtenerAlbaranesAsignadosAFactura = (idFactura) => axios.get(`${URL_BASE}/api/albaranProveedor/factura/${idFactura}`);

// export const obtenerFacturaProveedorPorId = (idFactura) => axios.get(`http://localhost:8080/api/facturaProveedor/${idFactura}`);
// export const obtenerFacturaProveedorPorId = (idFactura) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${idFactura}`);
export const obtenerFacturaProveedorPorId = (idFactura) => axios.get(`${URL_BASE}/api/facturaProveedor/${idFactura}`);

export const modificarFacturaProveedor = (
  id,
  fechaFactura,
  numeroFactura,
  tipoIVA,
  idProveedor,
) => {
  const body = {
    id,
    fechaFactura,
    numeroFactura,
    tipoIVA,
  };
  // return axios.put(`http://localhost:8080/api/facturaProveedor/${idProveedor}`, body);
  // return axios.put(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${idProveedor}`, body);
  return axios.put(`${URL_BASE}/api/facturaProveedor/${idProveedor}`, body);
};

// export const eliminarFacturaProveedor = (id) => axios.delete(`http://localhost:8080/api/facturaProveedor/${id}`);
// export const eliminarFacturaProveedor = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${id}`);
export const eliminarFacturaProveedor = (id) => axios.delete(`${URL_BASE}/api/facturaProveedor/${id}`);

// export const obtenerFacturasProveedoresEntreFechas = (fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/facturaProveedor/${fechaInicial}/${fechaFinal}`);
// export const obtenerFacturasProveedoresEntreFechas = (fechaInicial, fechaFinal) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${fechaInicial}/${fechaFinal}`);
export const obtenerFacturasProveedoresEntreFechas = (fechaInicial, fechaFinal) => axios.get(`${URL_BASE}/api/facturaProveedor/${fechaInicial}/${fechaFinal}`);

// export const obtenerFacturasPorProveedorEntreFechas = (idProveedor, fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/facturaProveedor/${idProveedor}/${fechaInicial}/${fechaFinal}`);
// export const obtenerFacturasPorProveedorEntreFechas = (idProveedor, fechaInicial, fechaFinal) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaProveedor/${idProveedor}/${fechaInicial}/${fechaFinal}`);
export const obtenerFacturasPorProveedorEntreFechas = (idProveedor, fechaInicial, fechaFinal) => axios.get(`${URL_BASE}/api/facturaProveedor/${idProveedor}/${fechaInicial}/${fechaFinal}`);

// export const obtenerProveedorPorId = (id) => axios.get(`http://localhost:8080/api/proveedores/${id}`);
// export const obtenerProveedorPorId = (id) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/proveedores/${id}`);
export const obtenerProveedorPorId = (id) => axios.get(`${URL_BASE}/api/proveedores/${id}`);

export const nuevaFacturaCliente = (fechaFactura, tipoIVA, idPropietario, idOrdenReparacion) => {
  const body = {
    fechaFactura,
    tipoIVA,
  };

  // return axios.post(`http://localhost:8080/api/facturaCliente/nuevaFactura/${idPropietario}/${idOrdenReparacion}`, body);
  // return axios.post(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/nuevaFactura/${idPropietario}/${idOrdenReparacion}`, body);
  return axios.post(`${URL_BASE}/api/facturaCliente/nuevaFactura/${idPropietario}/${idOrdenReparacion}`, body);
};

export const modificarFacturaCliente = (
  id,
  fechaFactura,
  tipoIVA,
  idOrdenReparacion,
) => {
  const body = {
    id,
    fechaFactura,
    tipoIVA,
  };

  // return axios.put(`http://localhost:8080/api/facturaCliente/modificarFactura/${idOrdenReparacion}`, body);
  // return axios.put(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/modificarFactura/${idOrdenReparacion}`, body);
  return axios.put(`${URL_BASE}/api/facturaCliente/modificarFactura/${idOrdenReparacion}`, body);
};

export const modificarFacturaClienteNoOR = (
  id,
  fechaFactura,
  tipoIVA,
) => {
  const body = {
    id,
    fechaFactura,
    tipoIVA,
  };
  // return axios.put('http://localhost:8080/api/facturaCliente/modificarFactura', body);
  // return axios.put('https://demo-render-1-mh2c.onrender.com/api/facturaCliente/modificarFactura', body);
  return axios.put(`${URL_BASE}/api/facturaCliente/modificarFactura`, body);
};

// export const ultimaFacturaCliente = () => axios.get('http://localhost:8080/api/facturaCliente/ultima-factura');
// export const ultimaFacturaCliente = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/facturaCliente/ultima-factura');
export const ultimaFacturaCliente = () => axios.get('https://demo-render-1-mh2c.onrender.com/api/facturaCliente/ultima-factura');

// export const obtenerFacturaClientePorId = (idFactura) => axios.get(`http://localhost:8080/api/facturaCliente/${idFactura}`);
// export const obtenerFacturaClientePorId = (idFactura) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/${idFactura}`);
export const obtenerFacturaClientePorId = (idFactura) => axios.get(`${URL_BASE}/api/facturaCliente/${idFactura}`);

// export const eliminarFacturaCliente = (id) => axios.delete(`http://localhost:8080/api/facturaCliente/${id}`);
// export const eliminarFacturaCliente = (id) => axios.delete(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/${id}`);
export const eliminarFacturaCliente = (id) => axios.delete(`${URL_BASE}/api/facturaCliente/${id}`);

// export const obtenerFacturasClientessEntreFechas = (fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/facturaCliente/${fechaInicial}/${fechaFinal}`);
// export const obtenerFacturasClientessEntreFechas = (fechaInicial, fechaFinal) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/${fechaInicial}/${fechaFinal}`);
export const obtenerFacturasClientessEntreFechas = (fechaInicial, fechaFinal) => axios.get(`${URL_BASE}/api/facturaCliente/${fechaInicial}/${fechaFinal}`);

// export const obtenerFacturasPorClienteEntreFechas = (idCliente, fechaInicial, fechaFinal) => axios.get(`http://localhost:8080/api/facturaCliente/${idCliente}/${fechaInicial}/${fechaFinal}`);
// export const obtenerFacturasPorClienteEntreFechas = (idCliente, fechaInicial, fechaFinal) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/facturaCliente/${idCliente}/${fechaInicial}/${fechaFinal}`);
export const obtenerFacturasPorClienteEntreFechas = (idCliente, fechaInicial, fechaFinal) => axios.get(`${URL_BASE}/api/facturaCliente/${idCliente}/${fechaInicial}/${fechaFinal}`);

// export const obtenerPropietarioPorId = (id) => axios.get(`http://localhost:8080/api/propietarios/${id}`);
// export const obtenerPropietarioPorId = (id) => axios.get(`https://demo-render-1-mh2c.onrender.com/api/propietarios/${id}`);
export const obtenerPropietarioPorId = (id) => axios.get(`${URL_BASE}/api/propietarios/${id}`);
