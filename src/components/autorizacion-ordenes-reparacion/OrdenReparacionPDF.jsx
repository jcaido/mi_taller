import React from 'react';
import {
  Page, Text, View, Document, StyleSheet,
} from '@react-pdf/renderer';

function OrdenReparacionPDF({ orden }) {
  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      color: 'grey',
    },
    title: {
      marginBottom: 40,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Times-Roman',
    },
    text: {
      margin: 12,
      fontSize: 11,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    subtitle: {
      fontSize: 12,
      margin: 12,
      fontFamily: 'Times-Roman',
    },
    firma: {
      marginTop: 100,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>
            Aguilar de la Frontera,
            {' '}
            { orden.fechaApertura }
          </Text>
          <Text style={styles.title} fixed>
            AUTORIZACION REPARACIÓN DE VEHÍCULO (Orden de reparación)
          </Text>
          <Text style={styles.text}>
            D.
            {' '}
            { orden.vehiculo.propietario.nombre }
            {' '}
            { orden.vehiculo.propietario.primerApellido }
            {' '}
            { orden.vehiculo.propietario.segundoApellido }
            {' '}
            con
            DNI nº.
            {' '}
            { orden.vehiculo.propietario.dni }
            {' '}
            y domicilio en
            {' '}
            { orden.vehiculo.propietario.domicilio }
            {' '}
            de
            {' '}
            { orden.vehiculo.propietario.codigoPostal.localidad }
            (
            { orden.vehiculo.propietario.codigoPostal.provincia }
            ), como propietario del vehiculo:
          </Text>
          <Text style={styles.subtitle}>
            { orden.vehiculo.marca }
            {' '}
            { orden.vehiculo.modelo }
            {' '}
            { orden.vehiculo.matricula }
            {' '}
            con
            {' '}
            { orden.kilometros }
            {' '}
            kilómetros
          </Text>
          <Text style={styles.text}>
            autoriza a MITALLER a realizar los trabajos siguientes sobre el vehículo descrito.
          </Text>
          <Text style={styles.subtitle}>
            { orden.descripcion }
          </Text>
          <Text style={styles.firma}>
            FIRMADO: D.
            {' '}
            { orden.vehiculo.propietario.nombre }
            {' '}
            { orden.vehiculo.propietario.primerApellido }
            {' '}
            { orden.vehiculo.propietario.segundoApellido }
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default OrdenReparacionPDF;
