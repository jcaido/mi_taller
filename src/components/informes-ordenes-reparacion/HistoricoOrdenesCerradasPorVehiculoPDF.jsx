import React from 'react';

function HistoricoOrdenesCerradasPorVehiculoPDF({ historico }) {
  return (
    <div>
      {
        historico.map((orden) => (
          <p key={orden.id}>{orden.descripcion}</p>
        ))
        }
    </div>
  );
}

export default HistoricoOrdenesCerradasPorVehiculoPDF;
