import api from "./api";

export interface Notification {
  id: number;
  type: string;
  lue: boolean;
  date: string;
  user_id?: number;
  contact_id?: number;
  enterprise_id?: number;
  temoignage_id?: number;
  contact?: { nom_complet: string; email: string };
}

export const notificationService = {
  getByUser: (userId: number) =>
    api.get<{ data: Notification[] }>(`/notifications/user/${userId}`),

  getUnreadCount: (userId: number) =>
    api.get<{ count: number }>(`/notifications/user/${userId}/unread-count`),

  markAsRead: (id: number) => api.put(`/notifications/${id}/read`),

  markAllAsRead: (userId: number) =>
    api.put(`/notifications/user/${userId}/mark-all-read`),

  delete: (id: number) => api.delete(`/notifications/${id}`),
};