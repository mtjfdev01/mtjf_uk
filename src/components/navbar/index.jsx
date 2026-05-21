import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.css' 
import Hamburger from '../hamburgermenu/Hamburger'
import Mobilenavbar from '../mobilenavbar/Mobilenavbar'
import logo from '../../assets/img/logos/only_logo.png'

// Navigation items mapping
const navItems = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/home#about-section" },
  { name: "Programs", path: "/home#programs-section" },
  { name: "Contact", path: "/home#contact-section" },
];

const Navbar = () => {
   const [activeLink, setActiveLink] = useState("Home");
   const location = useLocation();
   const navigate = useNavigate();
   // const observerRef = useRef(null);
   
   // Always use white background for all states
   const isLightTheme = false;

   // Update active link based on current route
   useEffect(() => {
     const currentPath = location.pathname.trim();
     
     // Check each nav item to see if current path matches
    const matchedItem = navItems.find(item => {
      const itemPath = item.path.trim();
      const isHome =
        (currentPath === '/' || currentPath === '/home') &&
        item.name === 'Home';
      const isExactMatch =
        currentPath === itemPath || currentPath === itemPath + ' ';
      const isProjectDetail =
        item.path.trim() === '/projects' &&
        currentPath.startsWith('/projects/');
      return isHome || isExactMatch || isProjectDetail;
    });
     
     if (matchedItem) {
       setActiveLink(matchedItem.name);
     } else {
       // Default to Home if no match found
       setActiveLink("Home");
     }
   }, [location.pathname]);

 const handleClick = (linkName, path) => {
  setActiveLink(linkName);

  // Home Page Sections
  if (
    path === "/home#about-section" ||
    path === "/home#programs-section" ||
    path === "/home#contact-section"
  ) {
    navigate("/home");

    setTimeout(() => {
      let sectionId = "";

      if (path.includes("about-section")) {
        sectionId = "about-section";
      }

      if (path.includes("programs-section")) {
        sectionId = "programs-section";
      }

      if (path.includes("contact-section")) {
        sectionId = "contact-section";
      }

      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);

    return;
  }

  // Default Home Navigation
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  navigate(path);
};

  return (
    <>
    <div className={`nav-container rounded fixed ${isLightTheme ? 'nav-light-theme' : 'nav-dark-theme'}`}>
        <div className='nav-row-1'>
            {/* logo section */}
            <div className='flex items-center logo_section'>
                <div className='logo'>
                  <Link to="/home">
                    <img src={logo} alt='logo' />
                  </Link>
                </div>
            </div>
            {/* menu section - desktop only */}
            <div className='d-none md:d-block' style={{fontSize:'1vw'}}>
              <ul className={`hvr flex gap-24 ${isLightTheme ? 'text-white' : 'text-dark'}`}>
                 {navItems.map((item) => (
                <li key={item.name} className={`nav-item ${item.submenu ? 'nav-item-has-sub' : ''}`}>
                  <Link
                    className={activeLink === item.name ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.name, item.path);
                    }}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ul className="nav-submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={activeLink === subItem.name ? "active" : ""}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClick(subItem.name, subItem.path);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              </ul>
            </div>

            <div className='md:d-none'>
              <Hamburger/>
            </div>
        </div>
       
      </div>
           <div>
            <Mobilenavbar/>
           </div>
           </>
         
  )
}
export default Navbar
