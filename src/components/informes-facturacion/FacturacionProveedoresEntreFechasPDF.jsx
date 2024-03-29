import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer,
} from '@react-pdf/renderer';

export default function FacturacionProveedoresEntreFechasPDF(
  { listaFacturasProveedores, fechaInicial, fechaFinal },
) {
  const fecInicial = fechaInicial.split('-');
  const fechaInicialAdaptada = `${fecInicial[2]}-${fecInicial[1]}-${fecInicial[0]}`;
  const fecFinal = fechaFinal.split('-');
  const fechaFinalAdaptada = `${fecFinal[2]}-${fecFinal[1]}-${fecFinal[0]}`;

  function baseImponible(factura) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const albaran of factura.albaranesProveedores) {
      // eslint-disable-next-line no-restricted-syntax
      for (const entrada of albaran.entradasPiezas) {
        total += entrada.cantidad * entrada.precioEntrada;
      }
    }
    return total;
  }

  function cuotaIvaFactura(factura) {
    return baseImponible(factura) * (factura.tipoIVA / 100);
  }

  function totalFactura(factura) {
    return baseImponible(factura) + cuotaIvaFactura(factura);
  }

  function totalBaseInponible(facturas) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const factura of facturas) {
      // eslint-disable-next-line no-restricted-syntax
      for (const albaran of factura.albaranesProveedores) {
        // eslint-disable-next-line no-restricted-syntax
        for (const entrada of albaran.entradasPiezas) {
          total += entrada.cantidad * entrada.precioEntrada;
        }
      }
    }
    return total;
  }

  function totalIvaSoportado(facturas) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const factura of facturas) {
      // eslint-disable-next-line no-restricted-syntax
      for (const albaran of factura.albaranesProveedores) {
        // eslint-disable-next-line no-restricted-syntax
        for (const entrada of albaran.entradasPiezas) {
          total += ((entrada.cantidad * entrada.precioEntrada) * factura.tipoIVA) / 100;
        }
      }
    }
    return total;
  }

  function totalFacturas(facturas) {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const factura of facturas) {
      // eslint-disable-next-line no-restricted-syntax
      for (const albaran of factura.albaranesProveedores) {
        // eslint-disable-next-line no-restricted-syntax
        for (const entrada of albaran.entradasPiezas) {
          total += (((entrada.cantidad * entrada.precioEntrada) * factura.tipoIVA) / 100)
          + entrada.cantidad * entrada.precioEntrada;
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
      width: '5%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    fechaFactura: {
      width: '13%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    numeroFactura: {
      width: '10%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    proveedor: {
      width: '25%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    cif: {
      width: '10%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    baseImponible: {
      width: '12%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    tipoIVA: {
      width: '8%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    cuotaIVA: {
      width: '8%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
      paddingLeft: 3,
    },
    totalFactura: {
      width: '10%',
      borderRightColor: '#90e5fc',
      borderRightWidth: 1,
      fontSize: 8,
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
      fontSize: 10,
    },
  });

  return (
    <PDFViewer style={{ width: '90%', height: '90vh', marginLeft: '80px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>FACTURAS DE PROVEEDORES</Text>
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
              <Text style={styles.referencia}>Ref</Text>
              <Text style={styles.fechaFactura}>Fecha Factura</Text>
              <Text style={styles.numeroFactura}>Nº Factura</Text>
              <Text style={styles.proveedor}>Proveedor</Text>
              <Text style={styles.cif}>CIF / NIF</Text>
              <Text style={styles.baseImponible}>Base Imponible</Text>
              <Text style={styles.tipoIVA}>(% IVA)</Text>
              <Text style={styles.cuotaIVA}>Cuota IVA</Text>
              <Text style={styles.totalFactura}>Total Factura</Text>
            </View>
          </View>
          {listaFacturasProveedores.map(
            (factura) => (
              <View style={styles.row} key={factura.id}>
                <Text style={styles.referencia}>{factura.id}</Text>
                <Text style={styles.fechaFactura}>{factura.fechaFactura}</Text>
                <Text style={styles.numeroFactura}>{factura.numeroFactura}</Text>
                <Text style={styles.proveedor}>{factura.proveedor.nombre}</Text>
                <Text style={styles.cif}>{factura.proveedor.dniCif}</Text>
                <Text style={styles.baseImponible}>{baseImponible(factura).toLocaleString('en')}</Text>
                <Text style={styles.tipoIVA}>{factura.tipoIVA}</Text>
                <Text style={styles.cuotaIVA}>{cuotaIvaFactura(factura).toLocaleString('en')}</Text>
                <Text style={styles.totalFactura}>{totalFactura(factura).toLocaleString('en')}</Text>
              </View>
            ),
          )}
          <View style={styles.total}>
            <Text style={styles.totalText}>
              {'TOTAL BASE IMPONIBLE:  '}
              {totalBaseInponible(listaFacturasProveedores).toLocaleString('en')}
              {' €'}
            </Text>
            <Text style={styles.totalText}>
              {'TOTAL IVA SOPORTADO:  '}
              {totalIvaSoportado(listaFacturasProveedores).toLocaleString('en')}
              {' €'}
            </Text>
            <Text style={styles.totalText}>
              {'TOTAL FACTURAS:  '}
              {totalFacturas(listaFacturasProveedores).toLocaleString('en')}
              {' €'}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
