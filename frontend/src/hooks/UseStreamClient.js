import { useState, useEffect,useContext } from "react";
import { StreamChat } from "stream-chat";
import {
  initializeStreamClient,
  disconnectStreamClient,
} from "../libs/stream.js";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function useStreamClient(project ) {
  const {token :authToken} =useContext(UserContext);
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);
  
  useEffect(() => {
    let isActive = true;
    let videoCall = null;
    let chatClientInstance = null;

    const init = async () => {
      if (!project?.callId) return;

      try {
        setIsInitializingCall(true);

        const {data}  = await axios.get(
                    `${import.meta.env.VITE_BASE_URI}/chats/token`,
                    {
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                      },
                    }
                  );

        const { token, userId, userName } = data;

        if (!isActive) return;

        // 🔹 VIDEO CLIENT
        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
          },
          token
        );

        if (!isActive) return;
        setStreamClient(client);

        // Use projectId as callId
        videoCall = client.call("default", project.callId);
        await videoCall.join({ create: true });

        if (!isActive) return;
        setCall(videoCall);

        // 🔹 CHAT CLIENT
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        
          await chatClientInstance.connectUser(
            {
              id: userId,
              name: userName,
            },
            token
          );
        

        if (!isActive) return;
        setChatClient(chatClientInstance);

        // Use projectId as channelId
        const chatChannel = chatClientInstance.channel("messaging",project.callId);

        await chatChannel.watch();

        if (!isActive) return;
        setChannel(chatChannel);
      } catch (error) {
        console.error("Stream init error:", error);
      } finally {
        if (isActive) setIsInitializingCall(false);
      }
    };

    if (project ) {
      init();
    }

    return () => {
      isActive = false;

      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [project]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;