import DataSideMenu from "@utils/SideNavData.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MenuDashboard = () => {
  const [menuActive, setMenuActive] = useState({
    pathname: "",
    title: "",
  });

  const handleMenu = (pathname, idxProps) => {
    if (pathname !== "javascript:void(0);") {
      setMenuActive({
        pathname,
        title: idxProps,
      });
      localStorage.setItem("titleSidebar", idxProps);
    }
  };

  useEffect(() => {
    setMenuActive({
      pathname: location.pathname,
      title: localStorage.getItem("titleSidebar"),
    });
  }, []);

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="/assets/logo/logo.png" alt="/assets/logo/logo.png" />
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            Sneat
          </span>
        </a>

        <a
          href="javascript:void(0);"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {DataSideMenu?.map((item, idx) => (
          <li
            className={
              menuActive.pathname === location.pathname &&
              item.title === menuActive.title
                ? "menu-item active"
                : item["sub-menu"].find(
                    (find) => find.href === menuActive.pathname
                  )
                ? "menu-item active open"
                : "menu-item"
            }
            key={idx}
          >
            <a
              href={
                item.href === "javascript:void(0);"
                  ? "javascript:void(0);"
                  : item.href
              }
              onClick={() => handleMenu(item.href, item.title)}
              className={
                item["sub-menu"]?.length > 0
                  ? "menu-link menu-toggle"
                  : "menu-link"
              }
            >
              <i className={`menu-icon tf-icons bx ${item.icon}`}></i>
              <div data-i18n="Account Settings">{item.title}</div>
            </a>
            {item["sub-menu"]?.length > 0 ? (
              <ul className="menu-sub">
                {item["sub-menu"]?.map((itemSub, idxSub) => (
                  <li
                    key={idxSub}
                    className={
                      menuActive.pathname === location.pathname &&
                      menuActive.title === itemSub.title
                        ? "menu-item active"
                        : "menu-item"
                    }
                  >
                    <a
                      href={itemSub.href}
                      onClick={() => handleMenu(itemSub.href, itemSub.title)}
                      className="menu-link"
                    >
                      <div data-i18n="Account">{itemSub.title}</div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default MenuDashboard;
