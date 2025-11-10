import apiClient from "./ApiClient";

const CuentaServices = {
  
  getAllCuentas: async () => {
    try {
      const response = await apiClient.get("/cuenta");
      return response.data;
    } catch (error) {
      console.error("Error al obtener cuentas:", error);
      throw error;
    }
  },

  
  getCuentaById: async (id) => {
    try {
      const response = await apiClient.get(`/cuenta/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener cuenta con ID ${id}:`, error);
      throw error;
    }
  },

  
  createCuenta: async (cuenta) => {
    try {
      const response = await apiClient.post("/cuenta", cuenta);
      return response.data;
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      throw error;
    }
  },


  deleteCuenta: async (id) => {
    try {
      const response = await apiClient.delete(`/cuenta/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar cuenta con ID ${id}:`, error);
      throw error;
    }
  },
};

export default CuentaServices;