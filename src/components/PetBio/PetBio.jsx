import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCat } from "../../services/cats";
import { likePost } from "../../services/users";
import "./PetBio.css";

export default function PetBio({ user }) {
  const [pet, setPet] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      const pet = await getCat(id);
      setPet(pet[0]);
    };
    fetchPet();
  }, [id]);
  // console.log(pet[0].name);
  // console.log(typeof(pet));

  const emailButton = () => {
    const recipient = "inquiries@petpals.netlify.app";
    const subject = `Adoption Request - ${pet.name}`;
    const body = `Hello, I am interested in adopting ${pet.name}!`;
    const mailtoLink = `mailto:${encodeURIComponent(recipient)}
                        ?subject=${encodeURIComponent(subject)}
                        &body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  const handleLikeToFav = async () => {
    if (!user) navigate("/signin");
    await likePost({
      user: user?.id,
      post: id,
    });

    toast.success(`${pet.name} added to favorites!`, {
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
  };

  return (
    <div className="pet-bio-container">
      <div className="pet-bio-image>">
        <img className="pet-bio-div-img" src={pet.image} alt={pet.breed} />
      </div>

      <div className="pet-info-column">
        <h1 className="pet-name">About {pet.name}</h1>
        <p>
          <span>Status:</span> Available
        </p>
        <p>
          <span>Breed:</span> {pet.breed}
        </p>
        <p>
          <span>Age:</span> {pet.age}
        </p>
        <p>
          <span>Gender:</span> {pet.gender}
        </p>
        <br />
        {pet.description}
        <br />

        <div className="buttons">
          {pet.animal_type === "Dog" ? (
            <Link to={"/allDogs"}>
              <button className="button">Go Back</button>
            </Link>
          ) : (
            <Link to={"/allCats"}>
              <button className="button">Back</button>
            </Link>
          )}
          <button className="button add-button" onClick={handleLikeToFav}>Add to Favorites</button>
          <button className="button" onClick={emailButton}>Adopt Me!</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
