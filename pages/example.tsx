import React from "react";
import { useAxios } from "../hooks/useAxios";

const Example2 = () => {
  const profile = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users
`,
      method: "GET",
    },
    immediate: true,
  });

  const video = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/video/lists`,
      method: "GET",
    },
    immediate: false,
  });

  console.log("Video", video);
  console.log("Profile : ", profile);

  const onClick = async () => {
    await video.executeFetch();
  };

  return (
    <div>
      <button onClick={onClick}>Get all videos</button>
    </div>
  );
};

export default Example2;
