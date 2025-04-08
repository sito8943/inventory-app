import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// providers
import { useManager } from "../../providers/ManagerProvider";

// utils
import { ReactQueryKeys } from "../../utils/queryKey";

// components
import AddCard from "../../components/Card/AddCard";
import MovementCard from "./components/MovementCard";
import {
  AddMovementDialog,
  EditMovementDialog,
} from "./components/MovementDialog";
import Loading from "../../components/Loading/Loading";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";

// hooks
import useAddMovement from "./hooks/dialogs/useAddMovement";
import useEditMovement from "./hooks/dialogs/useEditMovement";
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

  const getActions = useCallback((record) => [
    deleteMovement.action(record.id),
  ]);

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:movements.title")}</h2>
        {isLoading ? (
          <Loading
            size="text-3xl"
            containerClassName="flex justify-center items-center h-50"
          />
        ) : data?.length ? (
          <ul className="flex flex-wrap max-xs:flex-col gap-5">
            {data?.map((movement) => (
              <li key={movement.id}>
                <MovementCard
                  actions={getActions(movement)}
                  onClick={(id) => editMovement.onClick(id)}
                  {...movement}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="!text-gray-400 text-center mt-5">
            {t("_pages:movements.empty")}
          </p>
        )}
      </div>
      <AddCard
        disabled={isLoading}
        onClick={addMovement.onClick}
        tooltip={t("_pages:movements.add")}
      />

      {/* Dialogs */}
      <AddMovementDialog {...addMovement} />
      <EditMovementDialog {...editMovement} />
      <ConfirmationDialog {...deleteMovement} />
    </main>
  );
}

export default Movements;
