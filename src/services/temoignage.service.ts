import api from "./api";

export interface Temoignage {
  id: number;
  poste: string;
  message: string;
  photo?: string;
  statut: "EN_ATTENTE" | "VALIDER" | "REJETTER";
  service_id?: number;
  createdAt: string;
}

export const temoignageService = {
  getPublic: () => api.get<{ success: boolean; data: Temoignage[] }>("/temoignages/public"),
  getAll: () => api.get<{ success: boolean; total: number; data: Temoignage[] }>("/temoignages"),
  getById: (id: number) => api.get<Temoignage>(`/temoignages/${id}`),
  create: (body: Pick<Temoignage, "poste" | "message" | "service_id">) =>
    api.post<Temoignage>("/temoignages", body),
  valider: (id: number) => api.put(`/temoignages/${id}/valider`),
  refuser: (id: number) => api.put(`/temoignages/${id}/refuser`),
  update: (id: number, body: Partial<Temoignage>) => api.put(`/temoignages/${id}`, body),
  delete: (id: number) => api.delete(`/temoignages/${id}`),
  uploadPhoto: (id: number, file: File) => {
    const formData = new FormData();
    formData.append("photo", file);
    return api.post(`/temoignages/upload/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};