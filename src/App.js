import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contabilidad from './pages/Contabilidad.jsx'
import DatosGenerales from './pages/DatosGenerales.jsx'
import Facturacion from './pages/Facturacion.jsx'
import Home from './pages/Home.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Taller from './pages/Taller.jsx'
import TallerAutorizacionOrdenes from './pages/TallerAutorizacionOrdenes.jsx'
import TallerEdicionOrdenes from './pages/TallerEdicionOrdenes.jsx'
import TallerInformesOrdenes from './pages/TallerInformesOrdenes.jsx'
import TallerOpciones from './pages/TallerOpciones.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home></Home>} />
        <Route path = '/datos/*' element = {<DatosGenerales></DatosGenerales>}/>
        <Route path = '/taller/' element = {<Taller></Taller>}>
          <Route path = 'opciones' element = {<TallerOpciones></TallerOpciones>}/>
          <Route path = 'autorizacion-ordenes' element = {<TallerAutorizacionOrdenes></TallerAutorizacionOrdenes>}/>
          <Route path = 'edicion-ordenes' element = {<TallerEdicionOrdenes></TallerEdicionOrdenes>}/>
          <Route path = 'informes-ordenes' element = {<TallerInformesOrdenes></TallerInformesOrdenes>}/>
        </Route>  
        <Route path = '/facturacion' element = {<Facturacion></Facturacion>} />
        <Route path = '/contabilidad' element = {<Contabilidad></Contabilidad>} />
        <Route path = '*' element = {<NotFoundPage></NotFoundPage>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
