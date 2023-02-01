import React, { useState, useEffect } from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';
import { obtenerOrdenesReparacionAbiertasSort } from '../../services/axiosService';

function OrdenesAbiertasPDF() {
  const [listaOrdenesReparacionAbiertas, setListaOrdenesReparacionAbiertas] = useState([]);

  useEffect(() => {
    obtenerOrdenesReparacionAbiertasSort()
      .then((response) => {
        setListaOrdenesReparacionAbiertas(response.data);
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
      width: '10%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    apertura: {
      width: '15%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    description: {
      width: '35%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    matricula: {
      width: '15%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    marca: {
      width: '10%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 10,
      paddingLeft: 3,
    },
    modelo: {
      width: '15%',
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
            <Text style={styles.reportTitle}>ORDENES DE REPARACION ABIERTAS</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.container}>
              <Text style={styles.referencia}>Id</Text>
              <Text style={styles.apertura}>Fecha Apertura</Text>
              <Text style={styles.description}>Trabajos</Text>
              <Text style={styles.matricula}>Matricula</Text>
              <Text style={styles.marca}>Marca</Text>
              <Text style={styles.modelo}>Modelo</Text>
            </View>
            {listaOrdenesReparacionAbiertas.map(
              (ordenReparacion) => (
                <View style={styles.row} key={ordenReparacion.id}>
                  <Text style={styles.referencia}>{ordenReparacion.id}</Text>
                  <Text style={styles.apertura}>{ordenReparacion.fechaApertura}</Text>
                  <Text style={styles.description}>{ordenReparacion.descripcion}</Text>
                  <Text style={styles.matricula}>{ordenReparacion.vehiculoMatricula}</Text>
                  <Text style={styles.marca}>{ordenReparacion.vehiculoMarca}</Text>
                  <Text style={styles.modelo}>{ordenReparacion.vehiculoModelo}</Text>
                </View>
              ),
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>

  );
}

export default OrdenesAbiertasPDF;
