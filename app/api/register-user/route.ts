import { clerkClient } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const apiKey = process.env.STREAM_API_KEY;
  if (!apiKey) {
    return Response.error();
  }

  const serverClient = StreamChat.getInstance(
    apiKey,
    process.env.STREAM_SECRET
  );

  const body = await request.json();

  const userId = body?.userId;
  const mail = body?.email;

  if (!userId || !mail) {
    return Response.error();
  }

  const user = await serverClient.upsertUser({
    id: userId,
    role: "user",
    name: mail,
    imageUrl: `https://getstream.io/random_png/?id=${userId}&name=${mail}`,
  });

  const params = {
    publicMetadata: {
      streamRegistered: true,
    },
  };

  const updatedUser = await clerkClient.users.updateUser(userId, params);

  const response = {
    userId: userId,
    userName: mail,
  };

  return Response.json(response);
}
