// import api from "./apiConfig";
import { api } from "./apiConfig";

export const signUp = async (credentials) => {
  try {
    const resp = await api.post("/setup_user.php", credentials);
    // localStorage.setItem("token", resp.data.token);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const resp = await api.post("/login.php", credentials);
    // localStorage.setItem("token", resp.data.token);
    localStorage.setItem("username", resp.data.user.username);
    localStorage.setItem("user_id", resp.data.user.id);
    localStorage.setItem("user_email", resp.data.user.email);
   

    return {
      id: resp.data.user.id,
      username: resp.data.user.username,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    throw error;
  }
};


export const addPet = async (formData) => {
  try {
    const resp = await api.post("/setup_animal.php", formData);
    console.log(resp);

    return resp.data

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePassword = async (passwords, user) => {
  try {
    const resp = await api.post("/users");
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async () => {
  // const token = localStorage.getItem("token");
  const id = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const useremail = localStorage.getItem("user_email");
  if (username) {
    return {
      id,
      username,
      useremail,
    };
  }
};

export const addComment = async (comment) => {
  // console.log('sender-comment',comment);
  try {
    await api.post("/setup_comment.php", comment)
    // .then((result) => {console.log(result);});
  } catch (error) {
    throw error;
  }
};
//email data
export const sendEmail = async (data) => {
  try {
    await api.post("/buy_pet.php", data)
    .then((result) => {console.log(result);});
  } catch (error) {
    throw error;
  }
};

export const likePost = async (like) => {
  try {
    await api.post("/setup_like.php", like);
    console.log(like);
  } catch (error) {
    throw error;
  }
};

export const editComment = async (comment) => {
  // console.log('comment', comment.id);
  // console.log('id', id);
  // try {
  //   await api.put(`/comment/${id}/`, comment);
  // } catch (error) {
  //   throw error;
  // }
  try {
    await api.post("/setup_comment.php", comment)
    console.log(comment);
    // .then((result) => {console.log(result);});
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const users = await api.get("/get_user.php");
    return users.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPost = async (id) => {
  try {
    const users = await api.get(`/get_user_post.php?id=${id}`);
    return users.data;
  } catch (error) {
    throw error;
  }
};



export const deleteAnimal = async (id) => {
  try {
    const users = await api.post(`/delete_animal.php?id=${id}`);
    return users.data;
  } catch (error) {
    throw error;
  }
};