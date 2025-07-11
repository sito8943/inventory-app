// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// types
import { MenuItemType } from "./types";

export enum MenuKeys {
  Home = "home",
  Categories = "categories",
  Products = "products",
  Movements = "movements",
}

export const menuMap: MenuItemType[] = [
  {
    page: MenuKeys.Home,
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    page: MenuKeys.Categories,
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    page: MenuKeys.Products,
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    page: MenuKeys.Movements,
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
];
