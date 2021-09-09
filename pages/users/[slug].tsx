import React from "react";
import axios from "axios";
import withSession from "../../utils/session";

const Slug = ({ singleProfile, user }) => {
  console.log(user);
  return (
    <div className="p-3">
      <div>{singleProfile.data.id}</div>
      <div>{singleProfile.data.firstname}</div>
    </div>
  );
};

export default Slug;

// @ts-ignore
export const getServerSideProps = withSession(async ({ req, res, params }) => {
  const user = req.session.get("user");

  const singleProfileFetch = await axios.get(
    `https://fabrik-api.herokuapp.com/api/v1/fake/users/${params.slug}`
  );
  const singleProfile = singleProfileFetch.data;

  return {
    props: { singleProfile, user },
  };
});
