import { useState, useEffect } from "react";
import { pingBackend } from "../../../api/api";

export type BackendStatus = "checking" | "online" | "offline";

const usePingBackend = (): BackendStatus => {
  const [status, setStatus] = useState<BackendStatus>("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await pingBackend();
        setStatus("online");
      } catch (error) {
        setStatus("offline");
      }
    };

    checkBackend();
  }, []);

  return status;
};

export default usePingBackend;