import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

//types
import { DrawerPropsTypes } from "./types.ts";

// styles
import "./styles.css";

// sitemap
const sitemap = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "categories",
    path: "/categories",
  },
  {
    name: "products",
    path: "/products",
  },
  {
    name: "movements",
    path: "/movements",
  },
];

function Drawer(props: DrawerPropsTypes) {
  const { t } = useTranslation();

  const location = useLocation();

  const { open, onClose } = props;

  return (
    <div
      aria-label={t("_accessibility:ariaLabels.closeMenu")}
      aria-disabled={!open}
      className={`${open ? "opened" : "closed"} drawer-backdrop`}
      onClick={() => onClose()}
    >
      <aside className={`${open ? "opened" : "closed"} drawer animated`}>
        <h2 className="text-xl text-white px-5 pb-5 font-bold poppins">
          {t("_pages:home.appName")}
        </h2>
        <ul className="flex flex-col">
          {sitemap.map((link) => (
            <li
              key={link.name}
              className={`w-full flex hover:bg-alt-background ${
                (link.path ?? `/${link.name}`) === location.pathname
                  ? "bg-alt-background"
                  : ""
              } animated`}
            >
              <Link
                //@ts-ignore
                disabled={!open}
                aria-disabled={!open}
                to={link.path ?? `/${link.name}`}
                name={`_pages:${link.name}.title`}
                aria-label={t(`_accessibility:ariaLabels.${link.name}`)}
                className="text-lg text-white flex w-full py-2 px-5"
              >
                {t(`_pages:${link.name}.title`)}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Drawer;
