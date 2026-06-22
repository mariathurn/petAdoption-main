import { Pet } from "../../../api/types";

type Props = {
  pet: Pet;
  onMoreInfo: () => void;
};

export default function PetCard({ pet, onMoreInfo }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all w-72 p-4 flex flex-col justify-between">
      <div onClick={onMoreInfo} className="cursor-pointer">
        <img
          src={pet.img}
          alt={pet.name}
          className="rounded-md w-full h-44 object-cover mb-3"
        />
        <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2>

        <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs text-gray-600 mt-2 mb-4">
          <span className="bg-indigo-100 text-indigo-600 rounded-full px-3 py-2">
            Gender: {pet.gender}
          </span>
          <span className="bg-indigo-100 text-indigo-600 rounded-full px-3 py-2">
            Breed: {pet.breed}
          </span>
          <span className="bg-indigo-100 text-indigo-600 rounded-full px-3 py-2">
            Age: {pet.age}
          </span>
          <span className="bg-indigo-100 text-indigo-600 rounded-full px-3 py-2">
            Size: {pet.size}
          </span>
        </div>
      </div>

      <button
        onClick={onMoreInfo}
        className="border border-indigo-500 text-indigo-600 text-sm px-4 py-1 rounded-md hover:bg-indigo-600 hover:text-white cursor-pointer"
      >
        More Info
      </button>
    </div>
  );
}
