import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { Link } from "react-router-dom";
import { User } from "../types/models.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

export default function UserButton() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    if (e.currentTarget === e.target) return;
    setOpen((prev) => !prev);
  }

  return (
    <div className="">
      <div className="relative">
        <button onClick={() => setOpen((prev) => !prev)}>
          <FontAwesomeIcon
            icon={faUserAstronaut}
            className="text-sky-800 text-2xl"
          />
        </button>
        <div
          onClick={handleClick}
          style={{ opacity: open ? 1 : 0 }}
          className="absolute border rounded z-20 bg-white top-[120%] -right-2 transition-all duration-300 shadow shadow-black/30 py-2 px-4 min-w-max cursor-default"
        >
          {user ? (
            <ul>
              <li>
                <span>{user?.email}</span>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button className="text-blue-500" onClick={logout}>
                  Sign Out
                </button>
              </li>
            </ul>
          ) : (
            <div className="flex gap-2">
              <Link className="text-blue-500" to="/login">
                Login
              </Link>
              /
              <Link className="ml-auto text-blue-500" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div
          className="absolute inset-0 z-10 bg-transparent"
          onClick={handleOutsideClick}
        ></div>
      )}
    </div>
  );
}
