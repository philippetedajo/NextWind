import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAxios } from "../../hooks/useAxios";

const Slug = () => {
  const singleUser = useAxios();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    singleUser.fetchApi({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users/${slug}`,
      method: "GET",
    });
  }, [slug]);

  if (singleUser.isLoading) return <div className="p-3">...loading</div>;

  return (
    <div className="p-3">
      <div>{singleUser?.data?.data?.id} </div>
      <div>{singleUser?.data?.data?.firstname} </div>
    </div>
  );
};

export default Slug;
