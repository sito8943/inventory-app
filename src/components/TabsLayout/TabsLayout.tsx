// types
import { TabsLayoutPropsType } from "./types.ts";

// components
import { Tab } from "./Tab.tsx";
import { useState } from "react";

export const TabsLayout = (props: TabsLayoutPropsType) => {
  const { tabs = [], content } = props;

  const [value, setValue] = useState(tabs[0]?.id);

  return (
    <div className="bg-alt-background mt-5">
      <ul className="flex w-full items-center justify-start -mt-6">
        {tabs.map(({ id, label }) => (
          <li key={id}>
            <Tab onClick={() => setValue(id)} id={id} active={value === id}>
              {label}
            </Tab>
          </li>
        ))}
      </ul>
      {content}
    </div>
  );
};
