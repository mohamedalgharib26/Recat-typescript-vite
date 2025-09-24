import type { Post } from "../../Zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch("http://localhost:3000/users");
  if (!data.ok) throw new Error("Network error");
  const res = data.json();
  return res;
};
export const fetchPosts = async (): Promise<Post[]> => {
  const data = await fetch("http://localhost:3000/posts");
  if (!data.ok) throw new Error("Error Come True");
  const res = data.json();
  return res;
};

// Mutation
export const PostData = async <TBody, TResponse>(
  url: string,
  body?: TBody,
  options?: RequestInit
): Promise<TResponse> => {
  const data = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
  return data.json() as Promise<TResponse>;
};
