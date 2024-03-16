import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/CommentSection/CommentSection";
import PetBio from "../../components/PetBio/PetBio";
import { getCat } from "../../services/cats";

export default function PetDetail({ user }) {
  const [pet, setPet] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      const pet = await getCat(id);
      setPet(pet[0]);
    };
    fetchPet();
  }, [id, toggle]);

  // console.log("pet: ", pet);

  return (
    <div>
      <PetBio pet={pet} user={user} />
      <CommentSection
        comments={pet.comments}
        postId={pet.id}
        user={user}
        setToggle={setToggle}
      />
    </div>
  );
}
