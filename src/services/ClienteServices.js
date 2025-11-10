import apiClient from "./ApiClient";

const ClienteServices = {
  getAllClientes: async () => {
    try {
      const response = await apiClient.get("/api/cliente");
      return response.data;
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      throw error;
    }
  },

  getClienteById: async (id) => {
    try {
      const response = await apiClient.get(`/api/cliente/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener cliente con ID ${id}:`, error);
      throw error;
    }
  },

  createCliente: async (cliente) => {
    try {
      const response = await apiClient.post("/api/cliente", cliente);
      return response.data;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw error;
    }
  },

  deleteCliente: async (id) => {
    try {
      const response = await apiClient.delete(`/api/cliente/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar cliente con ID ${id}:`, error);
      throw error;
    }
  },
};

export default ClienteServices;
