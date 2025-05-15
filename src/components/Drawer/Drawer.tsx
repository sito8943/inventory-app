import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

//types
import { DrawerPropsTypes } from "./types.ts";

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

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div
      aria-label={t("_accessibility:ariaLabels.closeMenu")}
      aria-disabled={!open}
      className={`${
        open ? "w-screen h-screen" : "pointer-events-none"
      } fixed z-30`}
      onClick={() => onClose()}
    >
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-64"
        } pt-5 w-64 fixed top-0 left-0 z-1 border-r-2 rounded-r-lg border-border bg-drawer-background h-screen animated`}
      >
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
