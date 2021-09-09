import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import withSession from "../../utils/session";

const Create = ({ user }) => {
  console.log(user);
  const router = useRouter();
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const onCreateUser = async () => {
    setIsCreatingUser(true);
    await axios.post(
      `https://fabrik-api.herokuapp.com/api/v1/fake/users/create`,
      {
        role: "USER",
        firstname: "aureole",
        lastname: "aureole",
        password: "password",
        phone: "123452352367",
        email: "testsdfsd@test.com",
      }
    );
    router.push("/example");
    setIsCreatingUser(false);
  };

  return (
    <div>
      <button className="border rounded px-2" onClick={onCreateUser}>
        {isCreatingUser ? "loading..." : "Create user"}
      </button>
    </div>
  );
};

export default Create;

// @ts-ignore
export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");

  return {
    props: { user },
  };
});
