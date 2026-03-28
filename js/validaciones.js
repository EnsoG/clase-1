//importamos la función save desde firebase.js para guardar los datos en la base de datos
import { save, getData } from "./firebase.js"

document.getElementById('btnGuardar').addEventListener('click', () => {
   
    let msj = ''
    document.querySelectorAll('form input,textarea').forEach(item => {
        if(item.value.trim() == ''){
            msj += `Debe ingresar el campo ${item.name} \n`
        }
    })
    if(msj != ''){
        alert(msj)
        return false
    }
    else{
        //datos es un objeto que captura todos los valores ingresados en el formulario
        const datos = {
            nombre: document.getElementById('name').value,
            email: document.getElementById('email').value,
            fecha: document.getElementById('birthdate').value,
            mensaje: document.getElementById('message').value
        }
        console.log(datos)
        save(datos)
        alert('Datos guardados correctamente')
    }
})

//DOMContentLoaded es un evento que se ejecuta cuando el documento HTML ha sido completamente cargado y parseado, sin esperar a que las hojas de estilo, imágenes y subframes terminen de cargar
window.addEventListener('DOMContentLoaded', () => {
    //getData es una función que se encarga de escuchar los cambios en la colección de contactos, cada vez que hay un cambio en la colección, se ejecuta la función que recibe como parámetro, en este caso, una función que recibe un snapshot de la colección, el snapshot es un objeto que contiene toda la información de la colección, incluyendo los documentos y sus datos
    getData((coleccion) => {
        let tabla = ''
        console.log(coleccion)
        coleccion.forEach(doc => {
            //doc.data() es una función que se encarga de obtener los datos de cada documento, devuelve un objeto con los datos del documento
            const datos = doc.data()
            tabla += `
                <tr>
                    <td>${datos.nombre}</td>
                    <td>${datos.email}</td>
                    <td>${datos.fecha}</td>
                    <td>${datos.mensaje}</td>
                    <td>
                        <button class="btnEliminar" data-id="${doc.id}">Eliminar</button>
                    </td>

                </tr>
            `
        })
        document.getElementById('tablaContactos').innerHTML = tabla
    });
});