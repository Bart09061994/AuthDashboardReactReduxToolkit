import axios from "axios";

// Crea un'istanza di Axios con la configurazione di base per l'API
const api = axios.create({
  baseURL: "http://example.com/api", // Sostituisci con l'URL effettivo del tuo backend
});

// Interceptor per aggiungere il token di accesso alle richieste
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
