import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// providers
import { queryClient, useManager } from "../../../providers/ManagerProvider";

function addCategory() {
  const manager = useManager();

  const { control, handleSubmit } = useForm();

  const addFn = useMutation({
    mutationFn: (data) => manager.Categories.insert(data),
    onError: (error) => {
      console.error(error);
      //TODO THROW NOTIFICATION HERE
    },
    onSuccess: () => {
      queryClient.invalidateQueries([ReactQueryKeys.Categories]);
      //TODO THROW NOTIFICATION HERE
    },
  });

  return {};
}

export default addCategory;
