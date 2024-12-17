// src/utils/session.ts

import { getSession } from "next-auth/react";

// Function to get the authorization headers
export const getAuthHeaders = async () => {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error("No access token found");
  }
  return {
    Authorization: `Bearer ${session.accessToken}`,
  };
};