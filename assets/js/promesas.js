import {db} from "./firebase.js"
import { addDoc,collection,getDocs,deleteDoc,doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
export const registrarProducto = async(producto)=>{
    const docRef = await addDoc(collection(db,"productos"),producto);
};

export const obtenerProducto = async()=>{
    const ref = collection(db,"productos");
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc)=>{
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id})
    });
    console.log(listado)
    return listado;
};

export const actualizarProducto = async(objeto,id)=>{
    const ref = doc(db,"productos",id);
    await updateDoc(ref,objeto)
};

export const eliminarProducto = async(id)=>{
    const ref = doc(db,"productos",id);
    await deleteDoc(ref)
};

