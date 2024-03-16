import { api } from "./apiConfig";

export const getDogs = async () => {
  try {
    const response = await api.get("/get_dog.php");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLikedPost = async (id) => {
  try {
    const response = await api.post(`/remove_like.php?id=${id}`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
