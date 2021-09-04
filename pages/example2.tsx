import React from "react";
import { useAxios } from "../hooks/useAxios";

const Example2 = () => {
  const { data, isLoading } = useAxios({
    options: {
      url: `https://fabrik-api.herokuapp.com/api/v1/fake/users
`,
      method: "GET",
    },
    immediate: true,
  });

  console.log(data, isLoading);
  return <div>Example</div>;
};

export default Example2;
