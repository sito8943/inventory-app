import { useState } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// actions
import { useDoMovementAction } from "../actions/useDoMovementAction.tsx";

// types
import { AddMovementLogDto } from "lib";
import { DoMovementDialogPropsType } from "../../components/types.ts";

export function useDoMovement(): DoMovementDialogPropsType {
  const { t } = useTranslation();

  const manager = useManager();
  const [productId, setProductId] = useState<number>(0);

  const action = useDoMovementAction({
    onClick: (id) => setProductId(id as number),
  });

  return {
    ...useFormDialog<AddMovementLogDto, AddMovementLogDto>({
      title: t("_pages:products.forms.doMovement"),
      mutationFn: (data) => manager.Products.doMovement(data),
      onSuccessMessage: t("_pages:products.actions.doMovement.successMessage"),
      onError: (error) => {
        console.error(error);
      },
      ...ProductsQueryKeys.all(),
    }),
    action,
    productId,
  };
}
