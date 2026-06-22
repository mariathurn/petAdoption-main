import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdoptionEmailModal from "../components/adoptModal";
import { Pet } from "../../../api/types";
import { fetchPetByName } from "../api-service";

export default function PetDetails() {
  const { petName } = useParams<{ petName: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!petName) return;

    const fetchPet = async () => {
      try {
        const data = await fetchPetByName(petName);
        setPet(data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [petName]);

  if (!pet) {
    return (
      <div className="text-center text-red-600 mt-10">
        <h2 className="text-2xl">Pet not found 🐾</h2>
        <p>Please check the URL or return to the pet list.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-10">
      <div className="flex-1">
        <img
          src={pet.img}
          alt={pet.name}
          className="rounded-xl w-full object-cover h-80"
        />
        <div className="flex mt-4 gap-3 overflow-x-auto">
          {/* thumbnails */}
          {[pet.img, pet.img, pet.img].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${pet.name}-${i}`}
              className="w-24 h-24 rounded-lg object-cover"
            />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pet.name}</h1>
          <p className="text-sm text-gray-500">Pet ID: {pet.id}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-700 mb-2">{pet.name} Story</h3>
          <p className="text-sm text-gray-600">{pet.about}</p>
        </div>

        <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <li>✅ Can live with children</li>
          <li>💉 Vaccinated</li>
          <li>🏠 House-Trained</li>
          <li>♻️ Neutered</li>
          <li>📷 Microchipped</li>
          <li>📋 Shots up to date</li>
        </ul>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 rounded-lg bg-gray-50 border">
            <p className="font-medium text-indigo-700">Gender</p>
            <p>{pet.gender}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 border">
            <p className="font-medium text-indigo-700">Breed</p>
            <p>{pet.breed}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 border">
            <p className="font-medium text-indigo-700">Age</p>
            <p>{pet.age}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 border">
            <p className="font-medium text-indigo-700">Size</p>
            <p>{pet.size}</p>
          </div>
        </div>

        {showModal && (
          <AdoptionEmailModal
            petName={pet.name}
            onClose={() => setShowModal(false)}
          />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-800 text-white px-6 py-2 rounded-full hover:bg-[#9990DA] cursor-pointer"
          >
            Get started
          </button>
          <button
            className="ml-4 text-purple-800 border border-purple-800 px-6 py-2 rounded-full hover:bg-[#9990DA] hover:text-white cursor-pointer"
            onClick={() => navigate("/pets")}
          >
            Back to Pets
          </button>
        </div>
      </div>
    </div>
  );
}
