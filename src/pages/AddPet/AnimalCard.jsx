import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAnimal } from '../../services/users';

const AnimalCard = ({id, name, age, animal_type, breed, description, image, setReload }) => {

    const navigate = useNavigate();

    // const handleEdit = async (id) => {
    //     localStorage.setItem("edit_id", id)
    //     navigate("/edit-pet")
    //    };
 


    const handleDelete = async (id) => {
       await deleteAnimal(id);
        setReload(true)
      };

    return (
        <div className="flex justify-center items-center bg-blue-gray-50 max-w-[70%] mx-auto flex-row overflow-hidden rounded shadow-lg">
            <div className='flex items-center h-40 overflow-hidden w-96'>
                <img className="object-fill object-center" src={image} alt={`${name}`} />
            </div>
            <div className="w-4/6 px-6 py-4">
                <div className="mb-2 text-xl font-bold">{name}</div>
                <p className="text-sm text-gray-700">
                    {animal_type} - {breed}
                </p>
                <p className="text-base text-gray-700">
                    Age: {age} years
                </p>
            </div>
            
            <p className="text-sm text-gray-700">
                    {description}
            </p>

            <div className='flex flex-col gap-2 p-4'>
                <Link to={`/edit-pet/${id}`} className='px-4 py-2 text-center text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700'>Edit</Link>
                <button onClick={()=> handleDelete(id)} className='py-2 text-red-500 bg-white rounded-md shadow-md  text-centerpx-4 hover:bg-gray-300'>Delete</button>
            </div>
            
        </div>
    );
  };

export default AnimalCard;