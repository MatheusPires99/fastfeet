import React from "react";
import Skeleton from "react-loading-skeleton";

export default function TableLoading() {
  return (
    <div style={{ lineHeight: 3 }}>
      <Skeleton height={30} width={900} count={6} />
    </div>
  );
}
