import React from "react";
import withSession, { checkSession } from "../../utils/session";
import { fetcher } from "../../utils/fetcher";

const Slug = ({ singleProfile, user }) => {
  const { id, firstname } = singleProfile.data;
  console.log(user);

  return (
    <div className="p-3">
      <div>{id}</div>
      <div>{firstname}</div>
    </div>
  );
};

export default Slug;

export const getServerSideProps = withSession(async ({ req, res, params }) => {
  const { user } = checkSession(req, res);

  const singleProfile = await fetcher({
    url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/${params.slug}`,
    method: "GET",
  });

  return {
    props: { singleProfile, user },
  };
});
