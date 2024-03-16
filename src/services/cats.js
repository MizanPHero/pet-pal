import { api } from "./apiConfig";

export const getCats = async () => {
  try {
    const response = await api.get("/get_cats.php");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCat = async (id) => {
  try {
    const response = await api.get(`/get_post.php?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (id) => {
  try {
    const response = await api.get(`/get_post.php?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
