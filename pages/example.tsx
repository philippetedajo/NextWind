import React, { useState } from "react";
import withSession from "../utils/session";
import Link from "next/link";
import { fetcher } from "../utils/fetcher";
import { Response } from "../_types/fetcher_types";

const Example = ({ profile, user }) => {
  const [allProfile, setAllProfile] = useState(profile?.data);

  const onDeleteUser = async (userId) => {
    const data = await fetcher({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/${userId}`,
      method: "DELETE",
    });

    if (data.type === Response.SUCCESS) {
      let newProfileList = allProfile?.filter((u) => u.id != userId);
      setAllProfile(newProfileList);
    }
  };

  const profileList = allProfile?.map((el) => {
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
      <div className="mb-4">{profileList}</div>
      <div className="text-2xl mb-2">Create a user</div>
    </div>
  );
};

export default Example;

// @ts-ignore
export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");
  const profile = await fetcher({
    url: `https://fabrik-api.herokuapp.com/api/v1/fake/users`,
    method: "GET",
  });

  return {
    props: { profile, user },
  };
});
