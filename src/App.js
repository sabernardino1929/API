import React, { useState } from "react";
import "./App.css";
import ClienteServices from "./services/ClienteServices";
import CuentaServices from "./services/CuentaServices";
import TransaccionServices from "./services/TransaccionServices";

function App() {
  const [clientes, setClientes] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [cuentaId, setCuentaId] = useState("");
  const [transaccionId, setTransaccionId] = useState("");

  const [clienteForm, setClienteForm] = useState({
    TipoIdentificacion: "",
    NumeroIdentificacion: "",
    Nombre: "",
    Apellido: "",
    RazonSocial: "",
    Departamento: "",
  });

  const [cuentaForm, setCuentaForm] = useState({
    Saldo: "",
    ClienteID: "",
  });

  const [transaccionForm, setTransaccionForm] = useState({
    CuentaId: "",
    Tipo: "",
    Monto: "",
  });

  // --- Clientes ---
  const getAllClientes = async () => {
    try {
      const data = await ClienteServices.getAllClientes();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCliente = async (e) => {
    e.preventDefault();
    try {
      const newCliente = await ClienteServices.createCliente(clienteForm);
      alert(`Cliente creado con ID: ${newCliente.ClienteId}`);
      setClienteForm({
        TipoIdentificacion: "",
        NumeroIdentificacion: "",
        Nombre: "",
        Apellido: "",
        RazonSocial: "",
        Departamento: "",
      });
      getAllClientes();
    } catch (error) {
      console.error(error);
      alert("Error al crear cliente");
    }
  };

  const deleteCliente = async (id) => {
    if (!window.confirm("¿Eliminar cliente?")) return;
    try {
      await ClienteServices.deleteCliente(id);
      getAllClientes();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar cliente");
    }
  };

  // --- Cuentas ---
  const getAllCuentas = async () => {
    try {
      const data = await CuentaServices.getAllCuentas();
      setCuentas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCuenta = async (e) => {
    e.preventDefault();
    try {
      const newCuenta = await CuentaServices.createCuenta({
        Saldo: parseFloat(cuentaForm.Saldo),
        ClienteID: parseInt(cuentaForm.ClienteID),
      });
      alert(`Cuenta creada con ID: ${newCuenta.CuentaID}`);
      setCuentaForm({ Saldo: "", ClienteID: "" });
      getAllCuentas();
    } catch (error) {
      console.error(error);
      alert("Error al crear cuenta");
    }
  };

  const deleteCuenta = async (id) => {
    if (!window.confirm("¿Eliminar cuenta?")) return;
    try {
      await CuentaServices.deleteCuenta(id);
      getAllCuentas();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar cuenta");
    }
  };

  // --- Transacciones ---
  const getAllTransacciones = async () => {
    try {
      const data = await TransaccionServices.getAllTransacciones();
      setTransacciones(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTransaccion = async (e) => {
    e.preventDefault();
    try {
      const newTransaccion = await TransaccionServices.createTransaccion({
        CuentaId: parseInt(transaccionForm.CuentaId),
        Tipo: transaccionForm.Tipo,
        Monto: parseFloat(transaccionForm.Monto),
        FechaHora: new Date(),
      });
      alert(`Transacción creada con ID: ${newTransaccion.TransaccionId}`);
      setTransaccionForm({ CuentaId: "", Tipo: "", Monto: "" });
      getAllTransacciones();
    } catch (error) {
      console.error(error);
      alert("Error al crear transacción");
    }
  };

  const deleteTransaccion = async (id) => {
    if (!window.confirm("¿Eliminar transacción?")) return;
    try {
      await TransaccionServices.deleteTransaccion(id);
      getAllTransacciones();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar transacción");
    }
  };

  return (
    <div className="App">
      <h1>Banco Practicante</h1>

      {/* --- Clientes --- */}
      <section>
        <h2>Clientes</h2>
        <form onSubmit={createCliente}>
          <input placeholder="TipoIdentificacion" value={clienteForm.TipoIdentificacion} onChange={e => setClienteForm({...clienteForm, TipoIdentificacion: e.target.value})} required />
          <input placeholder="NumeroIdentificacion" value={clienteForm.NumeroIdentificacion} onChange={e => setClienteForm({...clienteForm, NumeroIdentificacion: e.target.value})} required />
          <input placeholder="Nombre" value={clienteForm.Nombre} onChange={e => setClienteForm({...clienteForm, Nombre: e.target.value})} required />
          <input placeholder="Apellido" value={clienteForm.Apellido} onChange={e => setClienteForm({...clienteForm, Apellido: e.target.value})} required />
          <input placeholder="RazonSocial" value={clienteForm.RazonSocial} onChange={e => setClienteForm({...clienteForm, RazonSocial: e.target.value})} />
          <input placeholder="Departamento" value={clienteForm.Departamento} onChange={e => setClienteForm({...clienteForm, Departamento: e.target.value})} />
          <button type="submit">Crear Cliente</button>
        </form>
        <button onClick={getAllClientes}>Listar Clientes</button>
        <ul>
          {clientes.map(c => (
            <li key={c.ClienteId}>{c.Nombre} {c.Apellido} <button onClick={() => deleteCliente(c.ClienteId)}>Eliminar</button></li>
          ))}
        </ul>
      </section>

      {/* --- Cuentas --- */}
      <section>
        <h2>Cuentas</h2>
        <form onSubmit={createCuenta}>
          <input placeholder="Saldo" value={cuentaForm.Saldo} onChange={e => setCuentaForm({...cuentaForm, Saldo: e.target.value})} required />
          <input placeholder="ClienteID" value={cuentaForm.ClienteID} onChange={e => setCuentaForm({...cuentaForm, ClienteID: e.target.value})} required />
          <button type="submit">Crear Cuenta</button>
        </form>
        <button onClick={getAllCuentas}>Listar Cuentas</button>
        <ul>
          {cuentas.map(c => (
            <li key={c.CuentaID}>ID: {c.CuentaID} - Saldo: {c.Saldo} <button onClick={() => deleteCuenta(c.CuentaID)}>Eliminar</button></li>
          ))}
        </ul>
      </section>

      {/* --- Transacciones --- */}
      <section>
        <h2>Transacciones</h2>
        <form onSubmit={createTransaccion}>
          <input placeholder="CuentaId" value={transaccionForm.CuentaId} onChange={e => setTransaccionForm({...transaccionForm, CuentaId: e.target.value})} required />
          <input placeholder="Tipo" value={transaccionForm.Tipo} onChange={e => setTransaccionForm({...transaccionForm, Tipo: e.target.value})} required />
          <input placeholder="Monto" value={transaccionForm.Monto} onChange={e => setTransaccionForm({...transaccionForm, Monto: e.target.value})} required />
          <button type="submit">Crear Transacción</button>
        </form>
        <button onClick={getAllTransacciones}>Listar Transacciones</button>
        <ul>
          {transacciones.map(t => (
            <li key={t.TransaccionId}>ID: {t.TransaccionId} - Tipo: {t.Tipo} - Monto: {t.Monto} <button onClick={() => deleteTransaccion(t.TransaccionId)}>Eliminar</button></li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
