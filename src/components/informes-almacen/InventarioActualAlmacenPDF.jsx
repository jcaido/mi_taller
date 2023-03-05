import React, { useState, useEffect } from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';
import { obtenerInventarioActualAlmacen } from '../../services/axiosService';

export default function InventarioActualAlmacenPDF() {
  const [listaInventarioActualAlmacen, setListaInventarioActualAlmacen] = useState([]);

  useEffect(() => {
    obtenerInventarioActualAlmacen()
      .then((response) => {
        setListaInventarioActualAlmacen(response.data);
      });
  }, []);

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
      width: '30%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    pieza: {
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
  });

  return (
    <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>INVENTARIO ACTUAL DE PIEZAS EN ALMACÉN</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.referencia}>Referencia</Text>
              <Text style={styles.pieza}>Pieza</Text>
              <Text style={styles.cantidad}>Cantidad (uds)</Text>
            </View>
            {listaInventarioActualAlmacen.map(
              (piezaLinea) => (
                <View style={styles.row} key={piezaLinea.id}>
                  <Text style={styles.referencia}>{piezaLinea.piezaReferencia}</Text>
                  <Text style={styles.pieza}>{piezaLinea.piezaNombre}</Text>
                  <Text style={styles.cantidad}>{piezaLinea.total}</Text>
                </View>
              ),
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
