import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;
let initializingPromise = null;

export const initializeStreamClient = async (user, token) => {
    if (!apiKey) {
        throw new Error("Stream API key is not provided.");
    }

    // Prevent multiple parallel initializations
    if (initializingPromise) return initializingPromise;

    initializingPromise = (async () => {
        try {
            // Reuse existing client if same user + token
            if (
                client &&
                client.user?.id === user.id &&
                client._token === token
            ) {
                initializingPromise = null;
                return client;
            }

            // Disconnect previous client if exists
            if (client) {
                await disconnectStreamClient();
            }

            // Create new client
            client = new StreamVideoClient({
                apiKey,
                user,
                token,
            });
            await client.connectUser(user, token);

            return client;
        } catch (error) {
            console.error("Stream initialization error:", error);
            throw error;
        } finally {
            initializingPromise = null;
        }
    })();

    return initializingPromise;
};

export const getStreamClient = () => client;

export const disconnectStreamClient = async () => {
    if (!client) return;

    try {
        await client.disconnectUser();
    } catch (error) {
        console.error("Error disconnecting Stream client:", error);
    } finally {
        client = null;
        initializingPromise = null;
    }
};