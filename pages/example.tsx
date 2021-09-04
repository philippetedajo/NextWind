import React from "react";
import { useAxios } from "../hooks/useAxios";

const Execute = () => {
  const { data, isLoading, executeFetch } = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users
`,
      method: "GET",
    },
    immediate: false,
  });

  const handleOnClick = async () => {
    await executeFetch();
  };

  console.log(data, isLoading);

  return (
    <div>
      <button onClick={handleOnClick}>Execute function</button>
    </div>
  );
};

export default Execute;
