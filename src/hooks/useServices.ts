import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Service, serviceService } from "@/services/service.service";

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: () => serviceService.getAll().then(r => r.data),
  });

export const useService = (id: number) =>
  useQuery({
    queryKey: ["services", id],
    queryFn: () => serviceService.getById(id).then(r => r.data),
    enabled: !!id,
  });

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<Service, "id" | "createdAt">) =>
      serviceService.create(body).then(r => r.data.data), // ← .data.data car { success, data: Service }
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<Service> }) =>
      serviceService.update(id, body).then(r => r.data.data), // ← idem
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => serviceService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
};