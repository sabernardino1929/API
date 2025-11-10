import apiClient from "./ApiClient";

const TransaccionServices = {
  
  getAllTransacciones: async () => {
    try {
      const response = await apiClient.get("/transaccion");
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      throw error;
    }
  },

  
  getTransaccionById: async (id) => {
    try {
      const response = await apiClient.get(`/transaccion/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener transacción con ID ${id}:`, error);
      throw error;
    }
  },

  
  createTransaccion: async (transaccion) => {
    try {
      const response = await apiClient.post("/transaccion", transaccion);
      return response.data;
    } catch (error) {
      console.error("Error al hacer la transacción:", error);
      throw error;
    }
  },


  deleteTransaccion: async (id) => {
    try {
      const response = await apiClient.delete(`/transaccion/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar transacción con ID ${id}:`, error);
      throw error;
    }
  },
};

export default TransaccionServices;