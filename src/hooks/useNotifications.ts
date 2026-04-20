import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";

export const useNotifications = (userId: number) =>
  useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => notificationService.getByUser(userId).then(r => r.data.data),
    enabled: !!userId,
    refetchInterval: 30_000, // polling toutes les 30s
  });

export const useUnreadCount = (userId: number) =>
  useQuery({
    queryKey: ["notifications-count", userId],
    queryFn: () => notificationService.getUnreadCount(userId).then(r => r.data.count),
    enabled: !!userId,
    refetchInterval: 30_000,
  });

export const useMarkAsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
};

export const useMarkAllAsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
};