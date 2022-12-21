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