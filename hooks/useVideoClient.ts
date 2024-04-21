import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { UseClientOptions } from "./useClient";
import { useEffect, useState } from "react";

export const useVideoClient = ({
  apiKey,
  user,
  tokenOrProvider,
}: UseClientOptions): StreamVideoClient | undefined => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const streamVideoClient = new StreamVideoClient({ apiKey });

    let didUserConnectInterrupted = false;

    const videoConnectionPromise = streamVideoClient
      .connectUser(user, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupted) {
          setVideoClient(streamVideoClient);
        }
      });

    return () => {
      didUserConnectInterrupted = true;
      setVideoClient(undefined);
      videoConnectionPromise.then(() => {
        streamVideoClient.disconnectUser();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, user.id, tokenOrProvider]);

  return videoClient;
};
