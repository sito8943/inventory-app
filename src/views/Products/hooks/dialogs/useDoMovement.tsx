import { useState } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// hooks
import { useFormDialog, ProductsQueryKeys } from "hooks";

// actions
import { useDoMovementAction } from "../actions/useDoMovementAction.tsx";

// types
import { DoMovementDto, MovementLogDto } from "lib";
import { DoMovementDialogPropsType, DoMovementFormType } from "../../types";

export function useDoMovement(): DoMovementDialogPropsType {
  const { t } = useTranslation();

  const manager = useManager();
  const [productId, setProductId] = useState<number>(0);

  const dialogProps = useFormDialog<
    MovementLogDto,
    DoMovementDto,
    MovementLogDto,
    DoMovementFormType
  >({
    formToDto: ({ product, movement, count }) => {
      console.log(product, movement, count);
      return {
        product: Number(product),
        movement: Number(movement),
        count: Number(count),
      };
    },
    defaultValues: { product: productId },
    title: t("_pages:products.forms.doMovement"),
    mutationFn: (data) => manager.Products.doMovement(data),
    onSuccessMessage: t("_pages:products.actions.doMovement.successMessage"),
    ...ProductsQueryKeys.all(),
  });

  const action = useDoMovementAction({
    onClick: (id) => {
      setProductId(id as number);
      dialogProps.onClick(id);
    },
  });

  console.log(productId);

  return {
    ...dialogProps,
    action,
  };
}
