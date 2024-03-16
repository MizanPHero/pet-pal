import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { getUserPost } from '../../services/users';
import './AddPet.css';
import AnimalCard from './AnimalCard';

const AddPet = () => {
  const [petName, setPetName] = useState('');
  const [image, setImage] = useState(null);
  const [age, setAge] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [owenerPets, SetOwnerPets] = useState([ ])
  const [reload, setReload] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    const ownerId = localStorage.getItem('user_id');
    setOwnerId(ownerId)
    if (!ownerId) {
     navigate('/signin');
    }
  }, [navigate]);


  useEffect(() => {
    const fetchUsersPosts = async () => {
      if (ownerId) {
        const pets = await getUserPost(ownerId);
      SetOwnerPets(pets)
      }
      
    };
    fetchUsersPosts();
  },[ownerId, reload]);

  // console.log(owenerPets);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('age', age);
    formData.append('animalType', animalType);
    formData.append('breed', breed);
    formData.append('description', description);
    formData.append('gender', gender);
    formData.append('ownerId', ownerId);
    formData.append('image', image); // append image
  
    try {
      const resp = await fetch('http://127.0.0.1/animal/setup_animal.php', {
        method: 'POST',
        body: formData,
      });
  
      // Assuming your PHP backend returns JSON data
      const data = await resp.json();
      if(!data.error){
        setPetName('');
        setAge('');
        setAnimalType('');
        setBreed('');
        setDescription('');
        setGender('');
        setImage('');
        toast.success(`Pet Added Successfully!`, {
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
        setReload(true);
      }
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };







  return (
    <div className='my-36'>
      <h1 className='text-4xl font-bold text-center'>Add a new pet</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl p-8 mx-auto bg-gray-100 rounded-xl">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Pet Name</label>
          <input
            type="text"
            value={petName}
            required
            onChange={(e) => setPetName(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Image Upload</label>
          <input
            type="file"
            required
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Age</label>
          <input
            type="text"
            value={age}
            required
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Animal Type</label>
          <select
            value={animalType}
            required
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Animal Type</option>
            <option value="1">Dog</option>
            <option value="2">Cat</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Breed</label>
          <input
            type="text"
            value={breed}
            required
            onChange={(e) => setBreed(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Description</label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Gender</label>
          <select
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

      <h1 className='text-4xl font-bold text-center mt-11'>Your Pets</h1>
      

      <div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {owenerPets.map(animal => (
            <AnimalCard key={animal.id} {...animal} setReload={setReload} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPet;
