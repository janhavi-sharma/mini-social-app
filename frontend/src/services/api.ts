import axios from 'axios';

const API_URL = 'https://mini-social-post-app.onrender.com/api';

// ---------- Login, Signop ----------
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/auth/signup`, data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};

// ---------- POSTS ----------
export const getPosts = async () => {
  const res = await axios.get(`${API_URL}/posts`);
  return res.data;
};

export const createPost = async (
  data: { text?: string; image?: string },
  token: string
) => {
  const res = await axios.post(`${API_URL}/posts`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const likePost = async (postId: string, token: string) => {
  const res = await axios.post(
    `${API_URL}/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const commentPost = async (
  postId: string,
  text: string,
  token: string
) => {
  const res = await axios.post(
    `${API_URL}/posts/${postId}/comment`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
