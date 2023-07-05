<h1 align="center"> GestTaller (Aplicación web) </h1>

**Índice**

1.- [Descripción del proyecto](#id1)

2.- [Funcionalidades](#id2)

3.- [Tecnologías utilizadas](#id3)

4.- [Cómo usuarlo](#id4)

5.- [Probar el proyecto](#id5)


## Descripción del proyecto<a name="id1"></a>
<p>Gestaller es un proyecto compuesto por una aplicacioón web que utiliza un API REST creado expresamente para el mismo. La información referente al citado API REST está disponible en https://github.com/jcaido/Taller-de-coches</p>


## Funcionalidades<a name="id2"></a>
<ul>
    <li>Gestión de datos generales: Propietarios y vehículos</li>
    <li>Gestión de proveedores: Piezas, albaranes y facturas</li>
    <li>Informes de almacén: Entradas, salidas, stock</li>
    <li>Gestión de órdenes de reparación</li>
    <li>Facturación de órdenes de reparación</li>
    <li>Informes de facturación: Clientes y proveedores</li>
</ul>


## Tecnologías utilizadas<a name="id3"></a>
<ul>
    <li>Reactjs con las siguientes dependencias:</li>
    <ul>
        <li>material-ui</li>
        <li>formix</li>
        <li>yup</li>
        <li>react-router-dom</li>
        <li>axios</li>
        <li>react-pdf/renderer</li>
    </ul>
    <li>Docker</li>
</ul>


## Cómo usarlo<a name="id4"></a>
<p>Para poder usar el proyecto, debemos tener instalados en nuestro sistema "node.js" y "npm (node package manager)"</p>
<p><strong>1.- Clonar repositorio</strong></p>
<ul>
    <li>Abrir  una interfaz de línea de comandos  (CLI), por ejemplo la consola de windows</li>
    <li>Crear una carpeta en la cual alojaremos el proyecto</li>
    <li>En la interfaz de línea de comandos y dentro de la carpeta creada en el punto anterior, ejecutamos el comando "git clone <a>https://github.com/jcaido/mi_taller</a>.git". Es necesario tener instalado git en nuestro sistema
    </li>
</ul>
<br>
<p><strong>2.- Uso en local</strong></p>
<ul>
    <li>Desde la raiz del proyecto, instalar las dependencias relacionadas en el archivo package.json con el comando "npm install"</li>
    <li>Desde la raiz del proyecto, ejecutar el comando "npm start", el cual nos levantará un servidor local en "http://localhost:3000" desde el cual accedemos a la aplicación</li>
</ul>
<br>
<p><strong>3.- Uso con Docker</strong></p>
<p>Para poder usar el proyecto utilizando docker, debemos tener instalado docker en nuestro sistema</p>
<ul>
    <li>Desde la raiz del proyecto, ejecutar el comando "docker build -t [NOMBRE DE LA IMAGEN]", el cual nos creará una imagen según las instrucciones del archivo dockerfile</li>
    <li>Desde la raiz del proyecto, ejecutar el comando "docker run -d -p 3000:3000 [NOMBRE DE LA IMAGEN]", el cual nos crea el contenedor correspondiente y nos habilita la direccion http://localhost:3000 desde la que accederemos a la aplicación</li>
</ul>


## Probar el proyecto<a name="id5"></a>
<p>Para probar el proyecto, debe estar ejecutándose el API REST asociado. Toda la información referente y las instrucciones para su uso, se encuentran disponibles en https://github.com/jcaido/Taller-de-coches</p>
    

