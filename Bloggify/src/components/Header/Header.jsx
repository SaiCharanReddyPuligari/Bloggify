import React from "react";
import { Container, Logo, LogoutButton } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  //bg-[#3b0764]
  return (
    <header className="sm:py-3 py-2 shadow-lg bg-background sticky top-0 z-10">
      <Container>
        <nav className="flex flex-wrap items-center justify-center">
          <div className="sm:mr-4 w-14">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <div className="ml-auto flex items-center justify-between">
          <ul className="flex sm:space-x-7 space-x-3 md:mr-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink to={item.slug} 
                        className={({isActive}) => `${isActive ? "text-primary": "text-text"} hover:text-primary `} 
                        onClick={() => navigate(item.slug)}
                    >
                        {item.name}
                    </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="mt-2">
                <LogoutButton />
              </li>
            )}
          </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
