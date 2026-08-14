import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

export async function fetchIpos(status = "") {
  const response = await api.get("/ipos", {
    params: status ? { status } : {}
  });
  return response.data;
}

export async function fetchIpo(id) {
  const response = await api.get(`/ipos/${id}`);
  return response.data;
}

export async function fetchGmpHistory(id) {
  const response = await api.get(`/ipos/${id}/gmp`);
  return response.data;
}
