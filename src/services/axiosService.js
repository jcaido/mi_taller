import axios from 'axios';

export const nuevoCodigoPostal = (codigo, localidad, provincia) => {
    
    let body = {
        codigo: codigo,
        localidad: localidad,
        provincia: provincia
    }

    return axios.post('http://localhost:8080/api/codigosPostales', body)
}

export const obtenerCodigosPostales = () => {
    return axios.get('http://localhost:8080/api/codigosPostales')
}

export const obtenerCodigoPostalPorCodigo = (codigo) => {
    return axios.get(`http://localhost:8080/api/codigosPostales/codigo/${codigo}`)
}

export const obtenerCodigosPostalesPorLocalidad = (localidad) => {
    return axios.get(`http://localhost:8080/api/codigosPostales/localidad/${localidad}`)
}

export const obtenerCodigosPostalesPorProvincia = (provincia) => {
    return axios.get(`http://localhost:8080/api/codigosPostales/provincia/${provincia}`)
}

export const modificarCodigoPostal = (id, codigo, localidad, provincia) => {

    let body = {
        id: id,
        codigo: codigo,
        localidad: localidad,
        provincia: provincia
    }
    return axios.put('http://localhost:8080/api/codigosPostales', body)
}

export const eliminarCodigoPostal = (id) => {
    return axios.delete(`http://localhost:8080/api/codigosPostales/${id}`)
}


export const nuevoPropietario = (nombre, primerApellido, segundoApellido, dni, domicilio, id_codigoPostal) => {
    
    let body = {
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        dni: dni,
        domicilio: domicilio
    }

    return axios.post(`http://localhost:8080/api/propietarios/${id_codigoPostal}`, body)
}

export const obtenerPropietarios = () => {
    return axios.get('http://localhost:8080/api/propietarios/parcial')
}

export const obtenerPropietarioPorDni = (dni) => {
    return axios.get(`http://localhost:8080/api/propietarios/dni/${dni}`)
}

export const obtenerPropietariosPorPrimerApellido = (primerApellido) => {
    return axios.get(`http://localhost:8080/api/propietarios/primer-apellido/parcial/${primerApellido}`)
}

export const obtenerPropietariosPorCodigoPostal = (id_codigoPostal) => {
    return axios.get(`http://localhost:8080/api/propietarios/codigo_postal/parcial/${id_codigoPostal}`)
}

export const modificarPropietario = (id, nombre, primerApellido, segundoApellido, dni, domicilio, id_codigoPostal) => {

    let body = {
        id: id,
        nombre: nombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        dni: dni,
        domicilio: domicilio
    }
    return axios.put(`http://localhost:8080/api/propietarios/${id_codigoPostal}`, body)
}

export const eliminarPropietario = (id) => {
    return axios.delete(`http://localhost:8080/api/propietarios/${id}`)
}

export const nuevoVehiculo = (matricula, marca, modelo, color, id_propietario) => {
    
    let body = {
        matricula: matricula,
        marca: marca,
        modelo: modelo,
        color: color
    }

    return axios.post(`http://localhost:8080/api/vehiculos/${id_propietario}`, body)
}

export const obtenerVehiculosPorMatricula = (matricula) => {
    return axios.get(`http://localhost:8080/api/vehiculos/matricula/${matricula}`)
}

export const obtenerVehiculos = () => {
    return axios.get('http://localhost:8080/api/vehiculos/parcial')
}

export const obtenerVehiculosPorMarcaModelo = (marcaModelo) => {
    return axios.get(`http://localhost:8080/api/vehiculos/marca-modelo/parcial/${marcaModelo}`)
}

export const obtenerVehiculosPorPropietario = (id_propietario) => {
    return axios.get(`http://localhost:8080/api/vehiculos/propietario/parcial/${id_propietario}`)
}

export const modificarVehiculo = (id, matricula, marca, modelo, color, id_propietario) => {

    let body = {
        id: id,
        matricula: matricula,
        marca: marca,
        modelo: modelo,
        color: color
    }
    return axios.put(`http://localhost:8080/api/vehiculos/${id_propietario}`, body)
}

export const eliminarVehiculo = (id) => {
    return axios.delete(`http://localhost:8080/api/vehiculos/${id}`)
}

export const nuevaOrdenReparacion = (fechaApertura, descripcion, kilometros, id_matricula) => {
    
    let body = {
        fechaApertura: fechaApertura,
        descripcion: descripcion,
        kilometros: kilometros,
        cerrada: false
    }

    return axios.post(`http://localhost:8080/api/ordenesReparacion/${id_matricula}`, body)
}

export const obtenerOrdenesReparacionAbiertas = ()=> {
    return axios.get('http://localhost:8080/api/ordenesReparacion/cerrada-parcial/false')
}