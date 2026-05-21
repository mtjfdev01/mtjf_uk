import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./mobilenavbar.css";

const links = [
  { name: "Home", section: "home" },
  { name: "About", section: "about-section" },
  { name: "Programs", section: "programs-section" },
  { name: "Contact", section: "contact-section" },
];

const Mobilenavbar = () => {
  const [visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/home"
    ) {
      setActiveLink("Home");
    }
  }, [location.pathname]);

  // Smooth Scroll Function
  const scrollToSection = (sectionId) => {
    // Home Scroll
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Menu Item Click
  const handleLinkClick = (item) => {
    setActiveLink(item.name);

    // Close Mobile Menu First
    const burger = document.querySelector(".hamburger.open");

    if (burger) {
      burger.click();
    }

    // Delay for menu close animation
    setTimeout(() => {
      scrollToSection(item.section);
    }, 300);
  };

  const handleSubmenuToggle = (itemName) => {
    setExpandedSubmenu((prev) =>
      prev === itemName ? null : itemName
    );
  };

  useEffect(() => {
    const onToggle = (e) => {
      if (
        e &&
        e.detail &&
        typeof e.detail.isOpen === "boolean"
      ) {
        setVisible(e.detail.isOpen);

        if (!e.detail.isOpen) {
          setExpandedSubmenu(null);
        }
      }
    };

    window.addEventListener(
      "mobile-menu-toggle",
      onToggle
    );

    return () =>
      window.removeEventListener(
        "mobile-menu-toggle",
        onToggle
      );
  }, []);

  if (!visible) return null;

  return (
    <div className="mbl lg:d-none md:d-block sm:d-block">
      <ul className="text-white">
        {links.map((item) => (
          <li key={item.name}>
            {item.submenu ? (
              <>
                <button
                  type="button"
                  className={`mbl-nav-trigger ${
                    activeLink === item.name ? "active" : ""
                  }`}
                  onClick={() =>
                    handleSubmenuToggle(item.name)
                  }
                >
                  {item.name}
                </button>

                {expandedSubmenu === item.name && (
                  <ul className="mbl-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <button
                          type="button"
                          className={
                            activeLink === subItem.name
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            handleLinkClick(subItem)
                          }
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <button
                type="button"
                className={
                  activeLink === item.name
                    ? "active"
                    : ""
                }
                onClick={() => handleLinkClick(item)}
              >
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mobilenavbar;