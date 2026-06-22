import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/petCard";
import { Pet } from "../../../api/types";
import { fetchAllPets } from "../api-service";

type Filter = "all" | "dog" | "cat";

export default function Pets() {
  const [filter, setFilter] = useState<Filter>("all");
  const [pets, setPets] = useState<Pet[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await fetchAllPets();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter(
    (pet) => filter === "all" || pet.pet === filter
  );

  const buttonClass =
    "border border-indigo-500 text-indigo-600 text-sm px-4 py-1 rounded-md hover:bg-indigo-600 hover:text-white transition";

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#9990DA] mt-6 mb-4">
        Fluffs to take home 🐶 🐱
      </h1>
      <div className="space-x-4 mb-6">
        <button onClick={() => setFilter("all")} className={buttonClass}>
          All
        </button>
        <button onClick={() => setFilter("dog")} className={buttonClass}>
          Dogs
        </button>
        <button onClick={() => setFilter("cat")} className={buttonClass}>
          Cats
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4">
        {filteredPets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onMoreInfo={() => navigate(`/pets/${pet.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
