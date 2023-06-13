import React from 'react';
import {
  Page, Text, View, Document, StyleSheet,
} from '@react-pdf/renderer';

export default function FacturaClientePDF({ factura }) {
  function totalPiezas() {
    let total = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const pieza of factura.ordenReparacion.piezasReparacion) {
      total += pieza.cantidad * pieza.pieza.precio;
    }
    return total;
  }

  const BaseImponible = (totalPiezas()
  + (factura.ordenReparacion.horas * factura.ordenReparacion.manoDeObra.precioHoraClienteTaller));

  const IVA = (BaseImponible * factura.tipoIVA) / 100;

  const totalFactura = BaseImponible + IVA;

  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    nombreFiscalTaller: {
      marginBottom: 5,
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Times-Roman',
    },
    datosFiscalesTaller: {
      fontSize: 10,
    },
    tituloDatosCliente: {
      marginTop: 15,
      fontSize: 12,
      fontWeight: 'bold',
    },
    datosCliente: {
      fontSize: 11,
    },
    datosFactura: {
      textAlign: 'center',
      fontSize: 15,
    },
    tituloDatosVehiculo: {
      marginTop: 15,
      fontSize: 12,
      fontWeight: 'bold',
    },
    datosVehiculo: {
      fontSize: 11,
    },
    trabajosRealizados: {
      fontSize: 11,
    },
    tituloPiezas: {
      marginTop: 15,
      fontSize: 12,
      fontWeight: 'bold',
    },
    datosPiezas: {
      fontSize: 10,
    },
    tituloManoDeObra: {
      marginTop: 15,
      fontSize: 12,
      fontWeight: 'bold',
    },
    datosManoDeObra: {
      fontSize: 10,
    },
    text: {
      fontSize: 11,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    totales: {
      fontSize: 15,
    },
    totalManoDeObra: {
      marginTop: 15,
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 40,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.nombreFiscalTaller}>
            GestTaller
          </Text>
          <Text style={styles.datosFiscalesTaller}>
            Calle XXXXXXXXX nº XXX
          </Text>
          <Text style={styles.datosFiscalesTaller}>
            CPXXXXX XXXXX(XXXXX)
          </Text>
          <Text style={styles.datosFiscalesTaller}>
            CIFXXXXXXXXXXX
          </Text>
        </View>
        <View>
          <Text style={styles.tituloDatosCliente}>
            CLIENTE
          </Text>
          <Text style={styles.datosCliente}>
            { factura.ordenReparacion.vehiculo.propietario.nombre }
            { ' ' }
            { factura.ordenReparacion.vehiculo.propietario.primerApellido }
            { ' ' }
            { factura.ordenReparacion.vehiculo.propietario.segundoApellido }
          </Text>
          <Text style={styles.datosCliente}>
            { factura.ordenReparacion.vehiculo.propietario.domicilio }
          </Text>
          <Text style={styles.datosCliente}>
            { factura.ordenReparacion.vehiculo.propietario.codigoPostal.codigo }
            { ' ' }
            { factura.ordenReparacion.vehiculo.propietario.codigoPostal.localidad }
            (
            { factura.ordenReparacion.vehiculo.propietario.codigoPostal.provincia }
            )
          </Text>
          <Text style={styles.datosCliente}>
            { factura.ordenReparacion.vehiculo.propietario.dni }
          </Text>
        </View>
        <View>
          <Text style={styles.datosFactura}>
            FACTURA:
            {' '}
            { factura.serie }
            -
            { factura.numeroFactura }
          </Text>
          <Text style={styles.datosFactura}>
            FECHA:
            {' '}
            { factura.fechaFactura }
          </Text>
        </View>
        <View>
          <Text style={styles.tituloDatosVehiculo}>
            VEHICULO
          </Text>
          <Text style={styles.datosVehiculo}>
            { factura.ordenReparacion.vehiculo.marca }
            { ' ' }
            { factura.ordenReparacion.vehiculo.modelo }
            { ' ' }
            { factura.ordenReparacion.vehiculo.matricula }
            {' '}
            { factura.ordenReparacion.kilometros }
            {' kms '}
          </Text>
          <Text style={styles.trabajosRealizados}>
            { factura.ordenReparacion.descripcion }
          </Text>
        </View>
        <View>
          <Text style={styles.tituloPiezas}>
            PIEZAS
          </Text>
          {factura.ordenReparacion.piezasReparacion.map(
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
          <Text style={styles.tituloPiezas}>
            {'TOTAL PIEZAS: '}
            {totalPiezas().toLocaleString('en')}
            {' €'}
          </Text>
        </View>
        <View>
          <Text style={styles.tituloManoDeObra}>
            MANO DE OBRA
          </Text>
          <Text style={styles.datosManoDeObra}>
            {factura.ordenReparacion.horas}
            {'  horas  x  '}
            {factura.ordenReparacion.manoDeObra.precioHoraClienteTaller.toLocaleString('en')}
            {' €/hora'}
          </Text>
          <Text style={styles.totalManoDeObra}>
            {'TOTAL MANO DE OBRA: '}
            {(factura.ordenReparacion.horas * factura.ordenReparacion.manoDeObra.precioHoraClienteTaller).toLocaleString('en')}
            {' €'}
          </Text>
        </View>
        <View>
          <Text style={styles.totales}>
            {'BASE IMPONIBLE: '}
            { BaseImponible.toLocaleString('en') }
            {' €'}
          </Text>
          <Text style={styles.totales}>
            {'IVA del '}
            { factura.tipoIVA }
            {' %: '}
            { IVA.toLocaleString('en') }
            {' €'}
          </Text>
          <Text style={styles.totales}>
            {'TOTAL FACTURA: '}
            { totalFactura.toLocaleString('en') }
            {' €'}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
