import api from "./api";

export interface Contact {
  id: number;
  nom_complet: string;
  societe?: string;
  telephone?: string;
  email?: string;
  message?: string;
  fonction?: string;
  objet?: string;
  createdAt: string;
}

export interface ContactsResponse {
  success: boolean;
  total: number;
  limit: number;
  offset: number;
  data: Contact[];
}

export const contactService = {
  getAll: (params?: { limit?: number; offset?: number; search?: string }) =>
    api.get<ContactsResponse>("/contacts", { params }),

  create: (body: Omit<Contact, "id" | "createdAt">) =>
    api.post<{ success: boolean; data: Contact }>("/contacts", body),

  delete: (id: number) =>
    api.delete<{ success: boolean; message: string }>(`/contacts/${id}`),
};