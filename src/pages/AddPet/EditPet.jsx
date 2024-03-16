import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getCat } from '../../services/cats';

const EditPet = () => {

    const [petName, setPetName] = useState('');
    const [image, setImage] = useState(null);
    const [age, setAge] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [pet, setPet] = useState({})

  
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        const ownerId = localStorage.getItem('user_id');
        setOwnerId(ownerId)
        if (!ownerId) {
         navigate('/signin');
        }
      }, [navigate]);


  useEffect(() => {
    const fetchPet = async () => {
      const pet = await getCat(id);
      setPet(pet[0]);
      setPetName(pet[0].name);
      setAge(pet[0].age);
      setAnimalType(pet[0].animal_type);
      setBreed(pet[0].breed);
      setDescription(pet[0].description)
      setGender(pet[0].gender)

    };
    fetchPet();
  }, [id]);

  
  console.log(pet);
//   console.log(animalType);
//   console.log(petName);
//   console.log(age);


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('id', id);
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
            toast.success(`Edited Successfully!`, {
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
            navigate("/addpet")
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };


    return (
        
    <div className='my-36'>
      <h1 className='py-2 text-4xl font-bold text-center'>Edit Pet Details</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl p-8 mx-auto bg-gray-100 rounded-xl">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Pet Name</label>
          <input
            type="text"
            // value={petName}
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Image Upload</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Age</label>
          <input
            type="text"
            value={age}
           
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
            onChange={(e) => setBreed(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Description</label>
          <textarea
            value={description}
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
      <ToastContainer />
        </div>
    );
};

export default EditPet;