import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

export default function ResumenOrdenesCerradasEntreFechasPDF(
  { listaOrdenes, fecInicial, fecFinal },
) {
  function totalPiezasPorOrden(idOrden) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const orden of listaOrdenes) {
      if (orden.id === idOrden) {
      // eslint-disable-next-line no-restricted-syntax
        for (const pieza of orden.piezasReparacion) {
          total += pieza.cantidad * pieza.pieza.precio;
        }
      }
    }
    return total;
  }

  function totalPiezas() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const orden of listaOrdenes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const pieza of orden.piezasReparacion) {
        total += pieza.cantidad * pieza.pieza.precio;
      }
    }
    return total;
  }

  function totalManoDeObra() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const orden of listaOrdenes) {
      total += orden.horas * orden.manoDeObra.precioHoraClienteTaller;
    }
    return total;
  }

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
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 24,
      borderWidth: 1,
      borderColor: '#bff0fd',
    },
    container: {
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      backgroundColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 24,
      textAlign: 'center',
      fontSize: 15,
      flexGrow: 1,
    },
    referencia: {
      width: '25%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    piezas: {
      width: '25%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    manoDeObra: {
      width: '25%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    totalReparacion: {
      width: '25%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    row: {
      flexDirection: 'row',
      borderBottomColor: '#bff0fd',
      borderBottomWidth: 1,
      alignItems: 'center',
      height: 30,
      color: 'black',
    },
    total: {
      marginTop: 20,
    },
    totalText: {
      marginTop: 20,
      // textAlign: 'center',
      fontSize: 15,
    },
  });

  return (
    <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View tyle={styles.titleContainer}>
            <Text style={styles.reportTitle}>RESUMEN TEMPORAL ORDENES DE REPARACIÓN CERRADAS</Text>
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
          <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.referencia}>Referencia (id)</Text>
              <Text style={styles.piezas}>Piezas (€)</Text>
              <Text style={styles.manoDeObra}>Mano de Obra (€)</Text>
              <Text style={styles.totalReparacion}>Total Reparación</Text>
            </View>
            {listaOrdenes.map(
              (ordenReparacion) => (
                <View style={styles.row} key={ordenReparacion.id}>
                  <Text style={styles.referencia}>{ordenReparacion.id}</Text>
                  <Text style={styles.piezas}>{totalPiezasPorOrden(ordenReparacion.id).toLocaleString('en')}</Text>
                  <Text style={styles.manoDeObra}>{(ordenReparacion.horas * ordenReparacion.manoDeObra.precioHoraClienteTaller).toLocaleString('en')}</Text>
                  <Text style={styles.totalReparacion}>{(totalPiezasPorOrden(ordenReparacion.id) + ordenReparacion.horas * ordenReparacion.manoDeObra.precioHoraClienteTaller).toLocaleString('en')}</Text>
                </View>
              ),
            )}
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>
              {'TOTAL PIEZAS:  '}
              {totalPiezas().toLocaleString('en')}
              {' €'}
            </Text>
            <Text style={styles.totalText}>
              {'TOTAL MANO DE OBRA:  '}
              {totalManoDeObra().toLocaleString('en')}
              {' €'}
            </Text>
            <Text style={styles.totalText}>
              {'TOTAL REPARACIONES:  '}
              {(totalPiezas() + totalManoDeObra()).toLocaleString('en')}
              {' €'}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
