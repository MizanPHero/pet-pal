import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPosts } from '../../services/cats';
import { deleteLikedPost } from '../../services/dogs';
import { getUsers } from '../../services/users';
import './Profile.css';



const UserProfile = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const navigate = useNavigate();

  // console.log('Like:', likes);
  // console.log('LoggedUser:', loggedUser);
  // console.log('Favorites:', favorites);
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // After users state is updated, get the logged user
    if (users.length > 0) {
      getLoggedUser(user?.id);
    }
  }, [users, user]);

  const fetchUsers = async () => {
    const usersFetched = await getUsers();
    setUsers(usersFetched);
  };

  const getLoggedUser = (id) => {
    const loggedUser = users.filter((userObj) => userObj.id == id);
    setLoggedUser(loggedUser);
    // Update the favorites state with the loggedUser
    setLikes(loggedUser[0]?.likes);
  };

  useEffect(() => {
    // Fetch all liked posts and store them in favorites
    const fetchLikedPosts = async () => {
      const likedPosts = [];
      for (const like of likes) {
        const post = await fetchPetById(like.post);
        likedPosts.push(post);
      }
      setFavorites(likedPosts);
    };

    if (likes?.length > 0) {
      fetchLikedPosts();
    }
  }, [likes]);

  const fetchPetById = async (id) => {
    const pet = await getPosts(id);
    console.log(pet);
    return pet;
  };

  const handleDelete = async (id) => {
    try {

      const likeToDelete = likes.find((like) => like.post === id);
  
      if (likeToDelete) {
        // Delete the liked post on the server using its id
        await deleteLikedPost(likeToDelete.id);
        // console.log(likeToDelete.id);
  
        // Remove the liked post from the likes state
        const updatedLikes = likes.filter(
          (like) => like.id !== likeToDelete.id
        );
        setLikes(updatedLikes);
        
        // Remove the liked post from the favorites state
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== likeToDelete.post
        );
        setFavorites(updatedFavorites);
      }

      toast.error("Delete from favorites", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton: false,
      });
    } catch (error) {
      console.error('Error deleting liked post:', error);
    }
  };
  

  return (
    <div className='user-profile'>
      <ToastContainer />
      <div className='flex items-center justify-between'>
        <h1>Welcome, {user?.username}!</h1>
        <h1 className='px-6 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-400'>
          <Link to={'/addpet'}>Add Pet</Link>
        </h1>
      </div>
      <div className='user-favorites'>
        <h1>Favorite Pals</h1>
        <div className='favorite-images'>
        {!favorites?.length && (
        <p className="no-favorites-message">(no Favorites yet)</p>
      )}
          {favorites?.map((favorite, index) => (
            <div className='favorite-image' key={index}>
              <img src={favorite[0].image} alt={favorite.name} />
              <div className='image-info'>
                <p>
                  <b>Name:</b> {favorite[0].name}
                </p>
                <p>
                  <b>Age:</b> {favorite[0].age}
                </p>
                <p>
                  <b>Description:</b> {favorite[0].description}
                </p>
              </div>
              <button onClick={() => handleDelete(favorite[0].id)}>
                {' '}
                Remove{' '}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
