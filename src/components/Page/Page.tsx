import { useMemo } from "react";
// @sito/dashboard
import { Action, Tooltip } from "@sito/dashboard";

// components
import { Actions, AddCard, Loading } from "components";

// types
import { PagePropsType } from "./types.ts";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// lib
import { BaseEntityDto } from "lib";

export const Page = (props: PagePropsType<BaseEntityDto>) => {
  const {
    title,
    children,
    isLoading,
    addOptions,
    actions,
    animated = true,
  } = props;

  const parsedActions = useMemo(() => {
    if (addOptions) {
      const addAction = {
        ...(addOptions as Action<BaseEntityDto>),
        icon: <FontAwesomeIcon icon={faAdd} />,
      };
      if (Array.isArray(actions)) actions.unshift(addAction);
      else return [addAction];
    }
    return actions;
  }, [actions, addOptions]);

  return (
    <main className="">
      <div className={`${animated ? "apparition" : ""} flex flex-col gap-5`}>
        <div className="flex items-center justify-between p-5 bg-base">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Actions actions={parsedActions ?? []} />
        </div>
        <div className="p-5 h-full">
          {isLoading ? (
            <Loading containerClassName="flex justify-center items-center h-50" />
          ) : (
            children
          )}
        </div>
      </div>
      {addOptions && <AddCard {...addOptions} />}
    </main>
  );
};
