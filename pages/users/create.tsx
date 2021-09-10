import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import withSession, { checkSession } from "../../utils/session";

const Create = ({ user }) => {
  const router = useRouter();
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const onCreateUser = async () => {
    setIsCreatingUser(true);
    await fetcher({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/create`,
      method: "POST",
      input: {
        role: "USER",
        firstname: "aureole",
        lastname: "aureole",
        password: "password",
        phone: "123452352367",
        email: "testsdfsd@test.com",
      },
    });

    await router.push("/example");
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
  const { user } = checkSession(req, res);

  return {
    props: { user },
  };
});
