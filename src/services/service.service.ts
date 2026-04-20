import api from "./api";

export interface Service {
  id: number;
  nom: string;
  description: string;
  image?: string;
  prix?: number;
  duree?: number;
  technologie?: string;
  createdAt: string;
}

export const serviceService = {
  getAll: () => api.get<Service[]>("/services"),
  getById: (id: number) => api.get<Service>(`/services/${id}`),
  create: (body: Omit<Service, "id" | "createdAt">) =>
    api.post<{ success: boolean; data: Service }>("/services", body),

  update: (id: number, body: Partial<Service>) =>
    api.put<{ success: boolean; data: Service }>(`/services/${id}`, body),
  delete: (id: number) =>
    api.delete<{ success: boolean; message: string }>(`/services/${id}`),
  getVideos: (id: number) => api.get(`/services/${id}/videos`),
};