import { createRoomContext } from "@liveblocks/react";

const PUBLIC_API_KEY = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_API_KEY;

const { RoomProvider, useRoom } = createRoomContext({
  publicApiKey: PUBLIC_API_KEY,
});

export { RoomProvider, useRoom };
