import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Slug = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`https://fabrik-api.herokuapp.com/api/v1/fake/users/${slug}`)
        .then((res) => setUser(res.data?.data));
    };
    getUser();
  }, [slug]);

  if (!user) return <div className="p-3">...loading</div>;

  return (
    <div className="p-3">
      <div>{user?.id}</div>
      <div>{user?.firstname}</div>
    </div>
  );
};

export default Slug;
