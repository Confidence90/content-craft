import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";

export const useContacts = (params?: { limit?: number; offset?: number; search?: string }) => {
  return useQuery({
    queryKey: ["contacts", params],
    queryFn: () => contactService.getAll(params).then(r => r.data),
  });
};

export const useCreateContact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: contactService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
};

export const useDeleteContact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => contactService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });
};