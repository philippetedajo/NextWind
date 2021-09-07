import React, { useEffect, useContext } from "react";
import { ActiveLink } from "./Links";
import Link from "next/link";
import { AuthContext } from "../context";

export const Header = () => {
  const { user, isLoading, logout } = useContext(AuthContext);

  return (
    <div className="px-10 py-4 flex justify-between border ">
      <div className="flex items-center">
        <ActiveLink activeClassName="" href="/">
          <a className="text-2xl cursor-pointer">Stamina</a>
        </ActiveLink>
      </div>

      {user && user?.isLoggedIn ? (
        <div>
          <Link href="/dashboard">
            <span className="text-blue-600 cursor-pointer"> Dashboard</span>
          </Link>
          <button onClick={() => logout()} className="px-3">
            {isLoading ? "Processing..." : "Logout"}
          </button>
        </div>
      ) : (
        <div>
          <Link href="/auth/login">
            <a className="text-xl my-3 mr-4 cursor-pointer">Login</a>
          </Link>
          <Link href="/auth/register">
            <a className="text-xl my-3 cursor-pointer">Register</a>
          </Link>
        </div>
      )}
    </div>
  );
};
