import React from "react";
import { useAxios } from "../hooks/useAxios";

const Example2 = () => {
  const AllUsers = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users
`,
      method: "GET",
    },
    immediate: true,
  });

  const video = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/video/list`,
      method: "GET",
    },
  });

  console.log("Video :", video);
  console.log("User : ", AllUsers);

  const onClick = async () => {
    await video.executeFetch();
  };

  const profileList = AllUsers.data?.data?.data.map((el) => {
    return <p key={el.id}>{el.firstname}</p>;
  });

  return (
    <div>
      <div className="text-2xl">All profile</div>
      <div> {profileList} </div>
      <button className="text-2xl" onClick={onClick}>
        Get all videos
      </button>
    </div>
  );
};

export default Example2;
