import React, { useEffect, useState } from "react";
import {
  IconAttention,
  IconSuccess,
  IconWarning,
} from "../components/Icons/Index";

export interface ToastInfoProps {
  randomize: number;
  type: "error" | "success" | "warning";
  message: string;
  errorId?: string;
  time?: number;
}

const ToastInfo = ({
  randomize, // RANDOMIZE como vem de um numero random serve pro componente entender q houve mudança  e renderizar novamente
  type,
  message,
  errorId,
  time = 3000,
}: ToastInfoProps) => {
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {

    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, time);
  }, [randomize]);

  if (!display) return <></>;
  return (
    <div
      className={`toast 
      flex items-center
      fixed bottom-4 right-4
      p-2 rounded-lg border
      ${
        type === "error"
          ? "bg-red-200 text-red-500 border-red-500"
          : type === "success"
          ? "bg-lime-200 text-lime-700 border-lime-500"
          : type === "warning" &&
            "bg-yellow-200 text-yellow-700 border-yellow-500"
      }`}
    >
      {type === "error" ? (
        <IconAttention />
      ) : type === "success" ? (
        <IconSuccess />
      ) : (
        type === "warning" && <IconWarning />
      )}
      <div className="ml-2 flex items-center">
        {errorId && <>#{errorId}:</>}
        <p className="p-1">{message}</p>
      </div>
    </div>
  );
};

export default ToastInfo;
