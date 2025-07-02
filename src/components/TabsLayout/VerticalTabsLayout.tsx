import {useState} from "react";

// types
import {TabsLayoutPropsType} from "./types.ts";

// components
import {Tab} from "./Tab.tsx";

// styles
import "./styles.css";

export const VerticalTabsLayout = (props: TabsLayoutPropsType) => {
    const {tabs = [], defaultTab, className = ""} = props;

    const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

    return (
        <div
            className={`vertical ${className}`}
        >
            <ul className={`tabs flex w-full items-center justify-start ${tabs.length > 1 ? "multiple" :""}`}>
                {tabs.map(({id, label}) => (
                    <li key={id} className={tabs.length > 1 ? "flex-1" : ""}>
                        <Tab
                            id={id}
                            onClick={() => setActiveTab(id)}
                            active={activeTab === id}
                        >
                            {label}
                        </Tab>
                    </li>
                ))}
            </ul>
            <ul className="grid grid-cols-1 gap-5 pt-5">
                {tabs.map(({id, label, content}) => <li key={id}>
                    <p id={String(id)} className="!text-xl mb-2">{label}</p>
                    {content}
                </li>)}
            </ul>
        </div>
    );
};
