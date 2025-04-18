import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import { Page, PrettyGrid, AddCard, Loading, ConfirmationDialog } from "../../components";
import {
  MovementCard,
  AddMovementDialog,
  EditMovementDialog,
} from "./components";

// hooks
import { useAddMovement, useEditMovement } from "./hooks/dialogs/";
import useDeleteDialog from "../../hooks/dialogs/useDeleteDialog";

function Movements() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useQuery({
    queryKey: [ReactQueryKeys.Movements],
    enabled: true,
    queryFn: () => manager.Movements.get({ deletedAt: null }),
  });

  // #region actions

  const deleteMovement = useDeleteDialog({
    mutationFn: (data) => manager.Movements.softDelete(data),
  });

  const addMovement = useAddMovement();

  const editMovement = useEditMovement();

  // #endregion

  const getActions = useCallback((record) => [deleteMovement.action(record)]);

  return (
    <Page title={t("_pages:movements.title")} isLoading={isLoading}>
      <PrettyGrid
        data={data}
        emptyMessage={t("_pages:movements.empty")}
        renderComponent={(movement) => (
          <MovementCard
            actions={getActions(movement)}
            onClick={(id) => editMovement.onClick(id)}
            {...movement}
          />
        )}
      />

      <AddCard
        disabled={isLoading}
        onClick={addMovement.onClick}
        tooltip={t("_pages:movements.add")}
      />

      {/* Dialogs */}
      <AddMovementDialog {...addMovement} />
      <EditMovementDialog {...editMovement} />
      <ConfirmationDialog {...deleteMovement} />
    </Page>
  );
}

export default Movements;
