import React, { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";

const Example2 = () => {
  const allUsers = useAxios();
  const allVideo = useAxios();

  useEffect(() => {
    allUsers.getData({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users`,
      method: "GET",
    });
  }, []);

  const onGetAllVideo = () => {
    allVideo.getData({
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/video/list`,
      method: "GET",
    });
  };

  const profileList = allUsers.data?.data?.data.map((el) => {
    return (
      <div key={el.id} className="flex">
        <div className="mr-10"> {el.firstname}</div>
      </div>
    );
  });
  const videoList = allVideo.data?.data?.data.map((el) => {
    return (
      <div key={el.id} className="flex">
        <div className="mr-10"> {el.id}</div>
      </div>
    );
  });

  console.log("allUser:", allUsers.data);
  console.log("allVideo:", allVideo.data);

  return (
    <div>
      <div className="text-2xl">All profile</div>
      <div> {allUsers.isLoading ? "loading..." : profileList} </div>
      <div className="text-2xl" onClick={onGetAllVideo}>
        all Video
      </div>
      <div> {allVideo.isLoading ? "loading..." : videoList} </div>
    </div>
  );
};

export default Example2;
