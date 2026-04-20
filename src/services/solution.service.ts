import api from "./api";

export interface Solution {
  id: number;
  titre: string;
  description: string;
  image: string;
  enterprise_id: number;
  createdAt: string;
}

export const solutionService = {
  getAll: () => api.get<Solution[]>("/solutions"),
  getById: (id: number) => api.get<Solution>(`/solutions/${id}`),
  create: (body: Omit<Solution, "id" | "createdAt">) => api.post<Solution>("/solutions", body),
  update: (id: number, body: Partial<Solution>) => api.put<Solution>(`/solutions/${id}`, body),
  delete: (id: number) => api.delete(`/solutions/${id}`),
};