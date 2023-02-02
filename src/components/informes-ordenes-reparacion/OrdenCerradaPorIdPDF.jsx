import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

function OrdenCerradaPorIdPDF({ ordenCerrada }) {
  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 24,
    },
    reportTitle: {
      color: '#F10000',
      letterSpacing: 4,
      fontSize: 16,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: 5,
    },
    referencia: {
      fontSize: 12,
      fontStyle: 'bold',
      textAlign: 'right',
      color: 'gray',
      marginBottom: 20,
    },
    titulo: {
      fontSize: 10,
      borderTopWidth: 2,
      borderColor: '#bff0fd',
      marginBottom: 6,
    },
    subtituloVehiculo: {
      width: 70,
      borderRadius: 5,
      marginTop: 6,
      marginBottom: 3,
      padding: 4,
      backgroundColor: '#F9A300',
      color: 'white',
    },
    subtituloPropietario: {
      width: 90,
      borderRadius: 5,
      marginTop: 6,
      marginBottom: 3,
      padding: 4,
      backgroundColor: '#F9A300',
      color: 'white',
    },
    subtituloPiezas: {
      width: 50,
      borderRadius: 5,
      marginTop: 6,
      marginBottom: 3,
      padding: 4,
      backgroundColor: '#F9A300',
      color: 'white',
    },
    subtituloManoDeObra: {
      width: 100,
      borderRadius: 5,
      marginTop: 6,
      marginBottom: 3,
      padding: 4,
      backgroundColor: '#F9A300',
      color: 'white',
    },
    datos: {
      fontSize: 8,
      marginLeft: 5,
      paddingTop: 2,
      paddingBottom: 2,
    },
    datosPiezas: {
      fontSize: 8,
      marginLeft: 5,
      paddingTop: 6,
      paddingBottom: 6,
      color: 'gray',
    },
  });

  return (
    <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>INFORME ORDEN DE REPARACIÓN CERRADA</Text>
          </View>
          <View>
            <Text style={styles.referencia}>
              {'Referencia: '}
              {ordenCerrada.id}
            </Text>
          </View>
          <View style={styles.titulo}>
            <Text style={styles.subtituloVehiculo}>
              VEHÍCULO:
            </Text>
            <Text style={styles.datos}>
              {'MATRÍCULA: '}
              {ordenCerrada.vehiculo.matricula}
            </Text>
            <Text style={styles.datos}>
              {'MARCA: '}
              {ordenCerrada.vehiculo.marca}
            </Text>
            <Text style={styles.datos}>
              {'MODELO: '}
              {ordenCerrada.vehiculo.modelo}
            </Text>
            <Text style={styles.datos}>
              {'COLOR: '}
              {ordenCerrada.vehiculo.color}
            </Text>
            <Text style={styles.datos}>
              {'KILÓMETROS: '}
              {ordenCerrada.kilometros}
            </Text>
          </View>
          <View style={styles.titulo}>
            <Text style={styles.subtituloPropietario}>
              PROPIETARIO:
            </Text>
            <Text style={styles.datos}>
              {'NOMBRE: '}
              {ordenCerrada.vehiculo.propietario.nombre}
              {' '}
              {ordenCerrada.vehiculo.propietario.primerApellido}
              {' '}
              {ordenCerrada.vehiculo.propietario.segundoApellido}
            </Text>
            <Text style={styles.datos}>
              {'DNI: '}
              {ordenCerrada.vehiculo.propietario.dni}
            </Text>
            <Text style={styles.datos}>
              {'DOMICILIO: '}
              {ordenCerrada.vehiculo.propietario.domicilio}
            </Text>
            <Text style={styles.datos}>
              {'CODIGO POSTAL: '}
              {ordenCerrada.vehiculo.propietario.codigoPostal.codigo}
              {' .- '}
              {ordenCerrada.vehiculo.propietario.codigoPostal.localidad}
              {' .- '}
              {ordenCerrada.vehiculo.propietario.codigoPostal.provincia}
            </Text>
          </View>
          <View style={styles.titulo}>
            <Text style={styles.subtituloPiezas}>
              PIEZAS:
            </Text>
            {ordenCerrada.piezasReparacion.map(
              (pieza) => (
                <Text key={pieza.id} style={styles.datosPiezas}>
                  {'REFERENCIA: '}
                  {pieza.pieza.referencia}
                  {'    '}
                  {pieza.pieza.nombre}
                  {'    '}
                  {pieza.cantidad}
                  {' uds'}
                  {'    '}
                  {pieza.pieza.precio}
                  {' $/ud '}
                </Text>
              ),
            )}
          </View>
          <View style={styles.titulo}>
            <Text style={styles.subtituloManoDeObra}>
              MANO DE OBRA:
            </Text>
            <Text style={styles.datos}>
              {ordenCerrada.horas}
              {'  horas'}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default OrdenCerradaPorIdPDF;
