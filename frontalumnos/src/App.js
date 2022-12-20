import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {
  
  const url = "https://localhost:44365/api/Alumnos";
  var [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado]= useState({
    Id_Alumno: '',
    Nombre: '',
    Apellido: '',
    Matricula: '',
    Id_Materia: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAlumnoSeleccionado({
      ...alumnoSeleccionado,
      [name]: value
    });
    //console.log(alumnoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(url)
    .then(response =>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
      //console.log(data);
    })
  }

  const peticionPost = async () => {
    delete alumnoSeleccionado.Id_Alumno;
    await axios.post(url,alumnoSeleccionado)
    .then(response =>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut = async () => {
    await axios.put(url+"/"+alumnoSeleccionado.Id_Alumno, alumnoSeleccionado)
    .then(response =>{
      var respuesta= response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(alumno=>{
        if(alumno.Id_Alumno===alumnoSeleccionado.Id_Alumno){
          alumno.Nombre = respuesta.Nombre;
          alumno.Apellido = respuesta.Apellido;
          alumno.Matricula = respuesta.Matricula;
          alumno.Id_Materia = respuesta.Id_Materia;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete = async () => {
    await axios.put(url+"/"+alumnoSeleccionado.Id_Alumno)
    .then(response =>{
      setData(data.filter(alumno=>alumno.Id_Alumno!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarAlumno = (alumno, caso)=>{
    setAlumnoSeleccionado(alumno);
    (caso === "Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }
  
  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
      <br/>
      <br/>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo Alumno</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id Alumno</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Matricula</th>
            <th>Materias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(alumno=>(
           <tr key={alumno.Id_Alumno}>  
              <td>{alumno.Id_Alumno}</td>
              <td>{alumno.Nombre}</td>
              <td>{alumno.Apellido}</td>
              <td>{alumno.Matricula}</td>
              <td>{alumno.Id_Materia}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarAlumno(alumno, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarAlumno(alumno, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Agregar Datos de Alumno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="Nombre"  onChange={handleChange}/>
            <br />
            <label>Apellido: </label>
            <input type="text" className="form-control" name="Apellido"  onChange={handleChange}/>
            <br />
            <label>Matricula: </label>
            <input type="text" className="form-control" name="Matricula"  onChange={handleChange}/>
            <br />
            <label>Materia: </label>
            <input type="text" className="form-control" name="Id_Materia"  onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Datos de Alumno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br/>
            <input type="text" className="form-control" readOnly/>
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="Nombre"  onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.Nombre}/>
            <br />
            <label>Apellido: </label>
            <input type="text" className="form-control" name="Apellido"  onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.Apellido}/>
            <br />
            <label>Matricula: </label>
            <input type="text" className="form-control" name="Matricula"  onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.Matricula}/>
            <br />
            <label>Materia: </label>
            <input type="text" className="form-control" name="Id_Materia"  onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.Id_Materia}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button> {" "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalHeader>Eliminar Datos de Alumno</ModalHeader>
        <ModalBody>
          ¿Estas seguro que deseas eliminar el alumno {alumnoSeleccionado && alumnoSeleccionado.Nombre}?
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>peticionDelete()}>
              Si
            </button>
            <button className='btn btn-secondary' onClick={()=>abrirCerrarModalEliminar()}>
              No
            </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
