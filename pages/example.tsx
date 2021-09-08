import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Example = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      await axios
        .get(`https://fabrik-api.herokuapp.com/api/v1/fake/users`)
        .then((res) => setUsers(res.data?.data));
    };
    getAllUsers();
  }, []);

  const onDeleteUser = async (userId) => {
    await axios
      .delete(`https://fabrik-api.herokuapp.com/api/v1/fake/users/${userId}`)
      .then((res) => {
        if (res.data.code == 200) {
          let newUsersList = users?.filter((u) => u.id != userId);
          setUsers(newUsersList);
        }
      });
  };

  const profileList = users?.map((el) => {
    return (
      <div key={el.id} className="flex w-60 justify-between">
        <Link href={`users/${el.id}`}>
          <div className="mr-10 cursor-pointer"> {el.firstname}</div>
        </Link>
        <button
          className="border rounded px-2 cursor-pointer"
          onClick={() => onDeleteUser(el.id)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="p-3">
      <Link href="/users/create">
        <a className="border px-3 py-2 my-5 rounded">Create User</a>
      </Link>
      <div className="text-2xl">All profile</div>
      <div className="mb-4">{users ? profileList : "loading..."}</div>
      <div className="text-2xl mb-2">Create a user</div>
    </div>
  );
};

export default Example;
