import DataSideMenu from "@utils/SideNavData.json";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { HelmetDashboard } from "@utils";

const listRole = ["admin", "kasir", "penjualan", "pembelian"];

const MenuDashboard = () => {
  const navigate = useNavigate();
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
      useNavigate(pathname);
    }
  };

  useEffect(() => {
    setMenuActive({
      pathname: location.pathname,
      title: localStorage.getItem("titleSidebar"),
    });
  }, []);

  const btnLogout = () => {
    localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const filterRole = (filter) => {
    const role = localStorage.getItem("role");

    switch (role) {
      case "kasir":
        return (
          filter.title === "Data Penjualan" ||
          filter.title === "Data Kwintansi" ||
          filter.title === "Data Pengeluaran"
        );

        break;

      case "penjualan":
        return filter.title === "Data Penjualan" || filter.title === "Cabang";
        break;
      case "pembelian":
        return filter.title === "Data Pembelian";
        break;

      case "admin":
        return filter.title !== "Cabang" && filter.title !== "Data Kwintansi";
        break;

      default:
        break;
    }
  };

  const filterRoleSubMenu = (filter) => {
    const role = localStorage.getItem("role");

    switch (role) {
      case "kasir":
        return (
          filter.title === "Penjualan" ||
          filter.title === "History Penjualan" ||
          filter.title === "Kwintansi" ||
          filter.title === "Pengeluaran"
        );

        break;
      case "penjualan":
        return (
          filter.title === "Penjualan Cabang" ||
          filter.title === "History Penjualan Cabang"
        );
        break;

      case "pembelian":
        return (
          filter.title === "Pembelian" ||
          filter.title === "Supplier" ||
          filter.title === "Hitory Pembelian"
        );
        break;

      case "admin":
        return (
          filter.title === "History Penjualan" ||
          filter.title === "History Penjualan Cabang" ||
          filter.title === "Hitory Pembelian" ||
          filter.title === "Supplier" ||
          filter.title === "Pembelian" ||
          filter.title === "Pengeluaran" ||
          filter.title === "Barang" ||
          filter.title === "Barang Rusak" ||
          filter.title === "Category"
        );
        break;

      default:
        return filter;
        break;
    }
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <HelmetDashboard />
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="/assets/logo/logo.png" alt="/assets/logo/logo.png" />
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
        {DataSideMenu?.filter(filterRole).map((item, idx) => (
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
                item["sub-menu"].length > 0
                  ? "menu-link menu-toggle"
                  : "menu-link"
              }
            >
              <i className={`menu-icon tf-icons bx ${item.icon}`}></i>
              <div data-i18n="Account Settings">{item.title}</div>
            </a>
            {item["sub-menu"]?.length > 0 ? (
              <ul className="menu-sub">
                {item["sub-menu"]
                  ?.filter(filterRoleSubMenu)
                  ?.map((itemSub, idxSub) => (
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
        <li class="menu-item">
          <a
            href="javascript:void(0);"
            onClick={btnLogout}
            className="menu-link"
          >
            <i className="menu-icon tf-icons bx bx-power-off"></i>
            <div data-i18n="Analytics">Logout</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default MenuDashboard;
