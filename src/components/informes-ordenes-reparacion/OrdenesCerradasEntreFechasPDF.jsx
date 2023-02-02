import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

function OrdenesCerradasEntreFechasPDF({ listaOrdenes, fecInicial, fecFinal }) {
  const fechaInicial = fecInicial.split('-');
  const fechaInicialAdaptada = `${fechaInicial[2]}-${fechaInicial[1]}-${fechaInicial[0]}`;
  const fechaFinal = fecFinal.split('-');
  const fechaFinalAdaptada = `${fechaFinal[2]}-${fechaFinal[1]}-${fechaFinal[0]}`;

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
    fechas: {
      fontSize: 12,
      fontStyle: 'bold',
      textAlign: 'right',
      color: 'gray',
      marginBottom: 20,
    },
    orden: {
      fontSize: 10,
      borderTopWidth: 2,
      borderColor: '#bff0fd',
      marginBottom: 6,
    },
    datos: {
      paddingTop: 6,
      paddingBottom: 6,
    },
    piezas: {
      paddingTop: 6,
      paddingBottom: 6,
      color: 'gray',
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
            <Text style={styles.reportTitle}>ORDENES DE REPARACION CERRADAS</Text>
          </View>
          <View>
            <Text style={styles.fechas}>
              {'Desde: '}
              {fechaInicialAdaptada}
              {'    '}
              {'Hasta: '}
              {fechaFinalAdaptada}
            </Text>
          </View>
          {listaOrdenes.map(
            (orden) => (
              <View key={orden.id} style={styles.orden}>
                <Text style={styles.datos}>
                  {'REFERENCIA: '}
                  {orden.id}
                  {'           '}
                  {'MATRÍCULA: '}
                  {orden.vehiculo.matricula}
                  {'      '}
                  {'MARCA: '}
                  {orden.vehiculo.marca}
                  {'      '}
                  {'MODELO: '}
                  {orden.vehiculo.modelo}
                  {'      '}
                  {'KILÓMETROS: '}
                  {orden.kilometros}
                </Text>
                <Text style={styles.datos}>
                  {'FECHA DE APERTURA : '}
                  {orden.fechaApertura}
                  {'           '}
                  {'FECHA DE CIERRE: '}
                  {orden.fechaCierre}
                </Text>
                <Text style={styles.datos}>
                  {'TRABAJOS: '}
                  {orden.descripcion}
                  {'           '}
                  {'MANO DE OBRA: '}
                  {orden.horas}
                  {' horas'}
                </Text>
                <Text style={styles.piezas}>
                  {'   PIEZAS:'}
                </Text>
                {orden.piezasReparacion.map(
                  (pieza) => (
                    <Text key={pieza.id} style={styles.datosPiezas}>
                      {'REFERENCIA: '}
                      {pieza.pieza.referencia}
                      {'    '}
                      {pieza.pieza.nombre}
                      {'    '}
                      {pieza.cantidad}
                      {' uds'}
                    </Text>
                  ),
                )}
              </View>
            ),
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default OrdenesCerradasEntreFechasPDF;
