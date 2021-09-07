import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../context";

const Dashboard = () => {
  const router = useRouter();
  const { logout, user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !user?.isLoggedIn) {
      router.push("/auth/login");
    }
  }, [user?.isLoggedIn]);

  return (
    <div className="w-full h-screen flex flex-col pt-20 items-center">
      <h1 className="text-2xl mb-5">Dashboard</h1>

      <Link href="/">
        <span className="text-blue-600 cursor-pointer mb-5">Go to Home</span>
      </Link>

      <div className="flex items-center flex-col mb-5">
        <div className="flex items-center flex-col">
          <div className="text-xl">Firstname</div>
          <div className="text-gray-500"> {user?.data?.data?.firstname}</div>
        </div>

        <div className="flex items-center flex-col">
          <div className="text-xl">Email</div>
          <div className="text-gray-500"> {user?.data?.data?.email}</div>
        </div>
      </div>

      <button onClick={() => logout()} className="border-2 w-40 px-3 rounded">
        {isLoading ? "Processing..." : "Logout"}
      </button>
    </div>
  );
};

export default Dashboard;
