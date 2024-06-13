//Primero importamos las distintas funciones que se crearon en el archivo promesas.js
import { obtenerProducto,registrarProducto,actualizarProducto,eliminarProducto } from "./promesas.js";


//Lo siguiente permite que al cargar la pagina se asignen eventos a los elementos que se estan llamando, en este caso se asigna eventos
//a los botones registrar y actualizar
window.addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar);
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
    cargarDatos();
});

//La funcion para llevar a cabo el registro
const registrar = (event)=>{
    event.preventDefault();

//Confirma que las vallidaciones se cumplen o no, esto toma un valor booleano (true/false), si se cumple sigue con el registro
    if (!validaciones()){
        return;
    }

//tomamos los distintos elementos del formulario
    let eNombre = document.getElementById("nombre")
    let eTipo = document.getElementById("tipo")
    let eDescripcion = document.getElementById("descripcion")
    let ePrecio = document.getElementById("precio")
    let eGarantia = document.getElementById("garantia")
    let eGama = document.getElementById("gama")
    let eFechaSalida = document.getElementById("fechaSalida")
    let eStock = document.getElementById("stock")

//se extraen los valores que se registraron
    let vNombre = eNombre.value;
    let vTipo = eTipo.value;
    let vDescripcion = eDescripcion.value;
    let vPrecio = ePrecio.value;
    let vGarantia = eGarantia.checked;
    let vGama = eGama.value;
    let vFechaSalida = eFechaSalida.value;
    let vStock = eStock.value;

//se asignan los datos anteriormente obtenidos a un objeto el cual sera registrado en la base de datos
    let objeto = {
        nombre: vNombre,
        tipo: vTipo,
        descripcion: vDescripcion,
        precio: vPrecio,
        garantia: vGarantia,
        gama: vGama,
        fechaSalida: vFechaSalida,
        stock: vStock
    };

//usando la funcion de promesas.js se registra el producto y se asigna el "objeto" luego de eso se muestra una alerta en pantalla
//que dice que se ha registrado el producto
    registrarProducto(objeto).then(() => {
        alert("Se ha registrado con éxito el producto");
        cargarDatos();
    }).catch((error) => {
        console.log(error);
    });
};

//La funcion para llevar a cabo la actualizacion
const actualizar = (event) => {
    event.preventDefault();
    let id = document.getElementById("btnRegistrar").value;
//si se intenta actualizar cuando no hay un id seleccionado por medio de actualizar de la tabla de registro
// se muestra  un mensaje de que no se ha seleccionado un producto.
    if (id==""){
        alert("No se ha seleccionado un producto para actualizar");
        return;
    }
//Confirma que las vallidaciones se cumplen o no, esto toma un valor booleano (true/false), si se cumple sigue con la actualizacion

    if (!validaciones()){
        return;
    }

//tomamos los distintos elementos del formulario
    let eNombre = document.getElementById("nombre");
    let eTipo = document.getElementById("tipo");
    let eDescripcion = document.getElementById("descripcion");
    let ePrecio = document.getElementById("precio");
    let eGarantia = document.getElementById("garantia");
    let eGama = document.getElementById("gama");
    let eFechaSalida = document.getElementById("fechaSalida");
    let eStock = document.getElementById("stock");

//se extraen los valores que se registraron
    let vNombre = eNombre.value;
    let vTipo = eTipo.value;
    let vDescripcion = eDescripcion.value;
    let vPrecio = ePrecio.value;
//para garantia se necesita saber si se checkeo o no
    let vGarantia = eGarantia.checked;
    let vGama = eGama.value;
    let vFechaSalida = eFechaSalida.value;
    let vStock = eStock.value;

//se asignan los datos anteriormente obtenidos a un objeto el cual sera actualizado en la base de datos

    let objeto = {
        nombre: vNombre,
        tipo: vTipo,
        descripcion: vDescripcion,
        precio: vPrecio,
        garantia: vGarantia,
        gama: vGama,
        fechaSalida: vFechaSalida,
        stock: vStock
    };

//Lo siguiente deshabilita el boton de actualizar cuando se realiza la actualizacion
    document.getElementById("btnActualizar").disabled = true;
//se llama a la funcion de promesas.js para actualizar el producto
//se muestra un mensaje que se llevo a cabo la actualizacion con exito
//el boton vuelve a estar disponible ya sea si se logro con exito o se produjo un error.
    actualizarProducto(objeto, id).then(() => {
        alert("Producto actualizado con éxito");
        cargarDatos();
        document.getElementById("btnActualizar").disabled = false;
        document.getElementById("btnRegistrar").value = '';
    }).catch((error) => {
        console.log(error);
        document.getElementById("btnActualizar").disabled = false;
    });
};


//Funcion que tiene como objetivo cargar los datos de los productos en la tabla de registro
const cargarDatos = () => {
//se llama la funcion de promesas.js 
    obtenerProducto().then((productos) => {
        let estructura = "";
//permite la creacion de la tabla con cada uno de los elementos que se han registrado, se utiliza la id asignada en el index 
//de los distintos inputs
//se añade tambien el boton de actualizar y eliminar en la tabla 
        productos.forEach((p) => {
            estructura += "<tr id='row-" + p.id + "'>";
            estructura += "<td>" + p.nombre + "</td>";
            estructura += "<td>" + p.tipo + "</td>";
            estructura += "<td>" + p.descripcion + "</td>";
            estructura += "<td>" + p.precio + "</td>";
//se realiza un if para comprobar si la garantia regresa o no un true o false dependiendo de si se checkeo o no.
//en caso de que si, se registra que Tiene garantia, caso contrario se muestra que no tiene garantia
            if (p.garantia) {
                estructura += "<td>Tiene garantía</td>";
            } else {
                estructura += "<td>No tiene garantía</td>";
            }
            estructura += "<td>" + p.gama + "</td>";
            estructura += "<td>" + p.fechaSalida + "</td>";
            estructura += "<td>" + p.stock + "</td>";
            estructura += "<td><button id='UPD" + p.id + "'>Actualizar</button></td>";
            estructura += "<td><button id='DEL" + p.id + "'>Eliminar</button></td>";
            estructura += "</tr>";
        });
//inserta la estructura anterior en el cuerpo de la tabla presente en el index
        document.getElementById("cuerpoTabla").innerHTML = estructura;
//se da funcionalidad a los botones tanto de actualizar como de eliminar generados 
        productos.forEach((p) => {
            let btnActualizar = document.getElementById("UPD" + p.id);
//lo que se realiza a continuacion es que al momento de hacer click en el boton actualizar de un producto registrado en la tabla
//este se cargue en el formulario de registro de producto
            btnActualizar.addEventListener("click", () => {
                document.getElementById("nombre").value = p.nombre;
                document.getElementById("tipo").value = p.tipo;
                document.getElementById("descripcion").value = p.descripcion;
                document.getElementById("precio").value = p.precio;
                document.getElementById("garantia").checked = p.garantia;
                document.getElementById("gama").value = p.gama;
                document.getElementById("fechaSalida").value = p.fechaSalida;
                document.getElementById("stock").value = p.stock;
                document.getElementById("btnRegistrar").value = p.id;
                actualizarProducto(p.id);
            });
//lo que se realiza a continuacion es que al momento de hacer click en el boton eliminar de un producto registrado en la tabla
//este de la opcion de eliminar, al hacer click en este se creara un nuevo evento donde se pide la confirmacion de la eliminacion
//si se presiona en confirmar se procese con la eliminacion y muestra una alerta en pantalla de que se llevo a cabo con exito
//si se presiona que cancelar se muestra un mensaje en la consola (no una alerta en pantalla) de que se cancelo la eliminacion
            let btnEliminar = document.getElementById("DEL" + p.id);
            btnEliminar.addEventListener("click", () => {
                if (confirm("Desea eliminar el producto: " + p.nombre)) {
                    eliminarProducto(p.id).then(() => {
                        alert("Eliminaste con éxito");
                        cargarDatos();
                    }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    console.log("Cancelaste la eliminacion");
                }
            });
        });
    });
};

//funcion para generar algunas validaciones en el formulario en este caso para nombre descripcion precio y stock
//trim se utiliza para eliminar cualquier espacio vacio, cosa de que un espacio no lo registre como un caracter o un valor.
const validaciones = () => {
    let nombre = document.getElementById("nombre").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let precio = document.getElementById("precio").value.trim();
    let stock = document.getElementById("stock").value.trim();


//se valida que el campo nombre no se encuentre vacio
    if (nombre == "") {
        alert("El nombre no puede estar vacio");
        return false;
    }

//se valida que la descripcion no se encuentre vacio
    if (descripcion == "") {
        alert("La descripción  no puede estar vacia");
        return false;
    }

//se valida que el precio no se encuentre vacio
    if (precio == "")  {
        alert("El precio no puede estar vacío");
        return false;
    }
//se valida que el precio (en este caso se usa Number para darle a entender que la logica  a tomar es para un valor numerico y no un string)
    if (Number(precio) <= 0) {
        alert("El precio no puede ser menor a 0")
        return false;
    }

//se valida que el stock no se encuentre vacio
    if (stock == "")  {
        alert("El stock no puede estar vacío");
        return false;
    }
//se valida que el stock (en este caso se usa Number para darle a entender que la logica  a tomar es para un valor numerico y no un string)

    if (Number(stock) <= 0) {
        alert("El stock no puede ser menor a 0")
        return false;
    }

    return true;
};

//si no hay problemas en la validacion entonces se retorna un true, valor booleano que se utilizara en la funcion validaciones()
//si no hay problema entonces se lleva a cabo el registro o la actualizacion del producto
//en caso de error se muestra el mensaje de alerta y NO se lleva a cabo el registro o actualizacion,