import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

function HistoricoOrdenesCerradasPorVehiculoPDF({ historico }) {
  function totalPiezas(idOrden) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const orden of historico) {
      if (orden.id === idOrden) {
        // eslint-disable-next-line no-restricted-syntax
        for (const pieza of orden.piezasReparacion) {
          total += pieza.cantidad * pieza.pieza.precio;
        }
      }
    }
    return total;
  }

  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 24,
      marginBottom: 10,
    },
    reportTitle: {
      color: '#F10000',
      letterSpacing: 4,
      fontSize: 16,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: 5,
    },
    header1: {
      fontSize: 12,
      textAlign: 'left',
      color: 'gray',
      marginBottom: 10,
    },
    separacion: {
      fontSize: 10,
      borderTopWidth: 2,
      borderColor: '#bff0fd',
      marginBottom: 6,
    },
    subtituloTrabajos: {
      width: 65,
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
    subtotal: {
      textAlign: 'right',
      color: 'red',
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
    totalText: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 15,
    },
  });

  return (
    <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>HISTÓRICO DE ÓRDENES DE REPARACIÓN</Text>
          </View>
          <View>
            <Text style={styles.header1}>
              {historico[0].vehiculo.marca}
              {'  '}
              {historico[0].vehiculo.modelo}
              {'  '}
              {historico[0].vehiculo.matricula}
            </Text>
          </View>
          {
          historico.map((orden) => (
            <View key={orden.id} style={styles.separacion}>
              <Text style={styles.subtituloTrabajos}>
                TRABAJOS
              </Text>
              <Text style={styles.datos}>
                {orden.descripcion}
              </Text>
              <Text style={styles.datos}>
                {'FECHA DE CIERRE:  '}
                {orden.fechaCierre}
              </Text>
              <Text style={styles.datos}>
                {'FECHA DE APERTURA:  '}
                {orden.fechaApertura}
              </Text>
              <Text style={styles.datos}>
                {'REFERENCIA(id):  '}
                {orden.id}
              </Text>
              <Text style={styles.datos}>
                {'KILÓMETROS:  '}
                {orden.kilometros}
              </Text>
              <Text style={styles.subtituloPiezas}>
                PIEZAS
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
                    {'  x  '}
                    {pieza.pieza.precio.toLocaleString('en')}
                    {' €/ud '}
                    {'  -------------->  '}
                    {(pieza.cantidad * pieza.pieza.precio).toLocaleString('en')}
                    {' €'}
                  </Text>
                ),
              )}
              <Text style={styles.subtotal}>
                {'TOTAL PIEZAS: '}
                {totalPiezas(orden.id).toLocaleString('en')}
                {' €'}
              </Text>
              <Text style={styles.subtituloManoDeObra}>
                MANO DE OBRA
              </Text>
              <Text style={styles.datos}>
                {orden.horas}
                {'  horas  x  '}
                {orden.manoDeObra.precioHoraClienteTaller.toLocaleString('en')}
                {' €/hora'}
              </Text>
              <Text style={styles.subtotal}>
                {'TOTAL MANO DE OBRA: '}
                {(orden.horas * orden.manoDeObra.precioHoraClienteTaller).toLocaleString('en')}
                {' €'}
              </Text>
              <Text style={styles.totalText}>
                {'TOTAL REPARACIÓN:  '}
                { (totalPiezas(orden.id) + orden.horas * orden.manoDeObra.precioHoraClienteTaller).toLocaleString('en') }
                {' €'}
              </Text>
            </View>
          ))
        }
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default HistoricoOrdenesCerradasPorVehiculoPDF;
