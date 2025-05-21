import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "providers";

// components
import { ConfirmationDialog, Page, PrettyGrid } from "../../components";
import {
  AddMovementDialog,
  EditMovementDialog,
  MovementCard,
} from "./components";

// hooks
import { useAddMovement, useEditMovement } from "./hooks/dialogs/";
import { useMovementsList, useDeleteDialog, MovementsQueryKeys } from "hooks";

// types
import { CategoryDto } from "lib";

function Movements() {
  const { t } = useTranslation();

  const manager = useManager();

  const { data, isLoading } = useMovementsList({});

  // #region actions

  const deleteMovement = useDeleteDialog({
    mutationFn: (data) => manager.Movements.softDelete(data),
    ...MovementsQueryKeys.all(),
  });

  const addMovement = useAddMovement();

  const editMovement = useEditMovement();

  // #endregion

  const getActions = useCallback(
    (record: CategoryDto) => [deleteMovement.action(record)],
    [deleteMovement],
  );

  return (
    <Page
      title={t("_pages:movements.title")}
      isLoading={isLoading}
      addOptions={{
        onClick: () => addMovement.onClick(),
        disabled: isLoading,
        tooltip: t("_pages:movements.add"),
      }}
    >
      <PrettyGrid
        data={data?.items}
        emptyMessage={t("_pages:movements.empty")}
        renderComponent={(movement) => (
          <MovementCard
            actions={getActions(movement)}
            onClick={(id: number) => editMovement.onClick(id)}
            {...movement}
          />
        )}
      />

      {/* Dialogs */}
      <AddMovementDialog {...addMovement} />
      <EditMovementDialog {...editMovement} />
      <ConfirmationDialog {...deleteMovement} />
    </Page>
  );
}

export default Movements;
