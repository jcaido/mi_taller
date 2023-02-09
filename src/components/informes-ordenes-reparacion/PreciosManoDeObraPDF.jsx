import React, { useState, useEffect } from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';
import { obtenerPreciosManoDeObra } from '../../services/axiosService';

function PreciosManoDeObraPDF() {
  // eslint-disable-next-line no-unused-vars
  const [listaPreciosManoDeObra, setListaPreciosManoDeObra] = useState([]);

  useEffect(() => {
    obtenerPreciosManoDeObra()
      .then((response) => {
        setListaPreciosManoDeObra(response.data);
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
      width: '60%',
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
      width: '20%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    fechaNuevoPrecio: {
      width: '30%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    precioManoDeObra: {
      width: '30%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    isPrecioActual: {
      width: '20%',
      borderRightColor: '#90e5fc',
      fontSize: 10,
      paddingLeft: 3,
    },
    isPrecioActualText: {
      width: '20%',
      borderRightColor: '#90e5fc',
      fontSize: 20,
      paddingLeft: 3,
      textAlign: 'center',
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
            <Text style={styles.reportTitle}>HISTÓRICO DE PRECIOS DE MANO DE OBRA</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.referencia}>Id</Text>
              <Text style={styles.fechaNuevoPrecio}>Fecha Nuevo Precio</Text>
              <Text style={styles.precioManoDeObra}>Precio Mano de Obra (€/hr)</Text>
              <Text style={styles.isPrecioActual}>Precio actual</Text>
            </View>
            {listaPreciosManoDeObra.map(
              (precio) => (
                <View style={styles.row} key={precio.id}>
                  <Text style={styles.referencia}>{precio.id}</Text>
                  <Text style={styles.fechaNuevoPrecio}>{precio.fechaNuevoPrecio}</Text>
                  <Text style={styles.precioManoDeObra}>{precio.precioHoraClienteTaller}</Text>
                  <Text style={styles.isPrecioActualText}>{precio.precioHoraClienteTallerActual ? '*' : null}</Text>
                </View>
              ),
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PreciosManoDeObraPDF;
