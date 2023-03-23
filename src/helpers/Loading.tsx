import React from "react";
import { IconLoading, IconLoadingSmall } from "../components/Icons/Index";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <IconLoading />
    </div>
  );
};
const LoadingSmall = () => {
  return (
    <div className="flex justify-center items-center">
      <IconLoadingSmall />
    </div>
  );
};

export { Loading, LoadingSmall };
