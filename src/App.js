import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import PetNavbar from "./components/Navbar/Navbar";
import ScrollToTopNavigation from "./components/ScrollToTop/ScrollToTop";
import About from "./pages/About/About";
import AddPet from "./pages/AddPet/AddPet";
import EditPet from "./pages/AddPet/EditPet";
import AllCats from "./pages/AllCats/AllCats";
import AllDogs from "./pages/AllDogs/AllDogs";
import Home from "./pages/Home/Home";
import PetDetail from "./pages/PetDetail/PetDetail";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { verifyUser } from "./services/users";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };
    fetchUser();
  }, []);


  return (
    <div className="App">
      <PetNavbar user={user} setUser={setUser} />
      <ScrollToTopNavigation />
      <Routes >
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/allcats" element={<AllCats user={user} />} />
        <Route path="/alldogs" element={<AllDogs user={user} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="allcats/:id" element={<PetDetail user={user} />} />
        <Route path="alldogs/:id" element={<PetDetail user={user} />} />
        <Route path="edit-pet/:id" element={<EditPet user={user} />} />
        <Route path="addpet" element={<AddPet user={user} />} />

      </Routes>
      <Footer />
    </div>
  );
}
