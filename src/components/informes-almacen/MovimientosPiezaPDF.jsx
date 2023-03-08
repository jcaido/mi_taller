import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

export default function MovimientosPiezaPDF({ listaMovimientosPieza, referenciaPieza }) {
  function totalExistenciaSPieza() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const movimiento of listaMovimientosPieza) {
      total += movimiento.cantidad;
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
    },
    reportTitle: {
      color: '#F10000',
      letterSpacing: 4,
      fontSize: 25,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    pieza: {
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
    fecha: {
      width: '30%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    proveedorMatricula: {
      width: '50%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    cantidad: {
      width: '20%',
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
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>MOVIMIENTOS DE ALMACÉN DE UNA PIEZA</Text>
          </View>
          <View>
            <Text style={styles.pieza}>
              {'Pieza (Referencia): '}
              {referenciaPieza}
            </Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.fecha}>Fecha movimiento</Text>
              <Text style={styles.proveedorMatricula}>Proveedor/Matrícula</Text>
              <Text style={styles.cantidad}>Cantidad (uds)</Text>
            </View>
            {listaMovimientosPieza.map(
              (movimiento, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <View style={styles.row} key={index}>
                  <Text style={styles.fecha}>{movimiento.fechaMovimiento}</Text>
                  <Text style={styles.proveedorMatricula}>{movimiento.proveedorMatricula}</Text>
                  <Text style={styles.cantidad}>{movimiento.cantidad}</Text>
                </View>
              ),
            )}
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>
              {'TOTAL EXISTENCIAS:  '}
              {totalExistenciaSPieza()}
              {' uds'}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
