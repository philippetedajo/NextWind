import React, { useEffect } from "react";
import Link from "next/link";
import { useAxios } from "../hooks/useAxios";

const Example = () => {
  const allUsers = useAxios();
  const deleteUser = useAxios();
  const createUser = useAxios();

  useEffect(() => {
    allUsers.getData({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users`,
      method: "GET",
    });
  }, [deleteUser.data, createUser.data]);

  const onDeleteUser = (userId) => {
    deleteUser.getData({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/${userId}`,
      method: "DELETE",
    });
  };

  const onCreateUser = () => {
    createUser.getData({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/create`,
      method: "POST",
      input: {
        role: "ROOT",
        firstname: "test",
        lastname: "test",
        password: "password",
        phone: "1234567",
        email: "test@test.com",
      },
    });
  };

  const profileList = allUsers.data?.data?.map((el) => {
    return (
      <div key={el.id} className="flex w-60 justify-between">
        <Link href={`users/${el.id}`}>
          <div className="mr-10 cursor-pointer"> {el.firstname}</div>
        </Link>
        <div
          className="border rounded px-2 cursor-pointer"
          onClick={() => onDeleteUser(el.id)}
        >
          Delete
        </div>
      </div>
    );
  });

  return (
    <div className="p-3">
      <div className="text-2xl">All profile</div>
      <div className="mb-4">
        {allUsers.isLoading ? "loading..." : profileList}{" "}
      </div>
      <div className="text-2xl mb-2">Create a user</div>
      <button className="border rounded px-2" onClick={onCreateUser}>
        {createUser.isLoading ? "...loading" : "Create user"}
      </button>
    </div>
  );
};

export default Example;
