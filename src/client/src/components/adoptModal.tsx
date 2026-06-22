import { FC } from "react";

interface AdoptionEmailModalProps {
  petName: string;
  onClose: () => void;
}

const AdoptionEmailModal: FC<AdoptionEmailModalProps> = ({
  petName,
  onClose,
}) => {
  const mailtoLink = encodeURI(
    `mailto:adoptions@example.com?subject=Dog Adoption Application&body=` +
      `🏠 Home setup: \nWhere do you live and what’s your home setup (house, apartment, yard)?\n\n` +
      `👨‍👩‍👧‍👦 Household: \nDo you live with kids or other pets?\n\n` +
      `🕐 Daily routine: \nWhat’s your daily schedule like? Will someone be home during the day?\n\n` +
      `🐾 Motivation: \nWhy do you want to adopt ${petName}?\n\n` +
      `🦴 Experience: \nWhat experience do you have with dogs (training, vet care)?\n\n` +
      `📷 Bonus: \nI've attached pictures of my home/yard if helpful!\n\n` +
      `Looking forward to hearing from you!\n\nBest,\n[Your Name]`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 mb-0">
      <div className="bg-white max-w-lg w-full p-6 md:p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 border w-8 h-8 rounded-full p-1 right-4 text-purple-800 hover:bg-[#9990DA] cursor-pointer"
        >
          X
        </button>

        <h1 className="text-xl font-bold text-[#9990DA] mt-6 mb-4">
          Great, you are one step closer to have{" "}
          <span className="font-bold text-purple-800">{petName}</span> as your
          new best friend!
        </h1>
        <p className="text-gray-600 font-bold mb-4">
          To get started, please send us an email to:{" "}
          <span className="underline text-blue-300">adoptme@fluffls.com</span>
        </p>

        <p className="text-gray-600 mb-4">
          When applying to adopt a dog, a well-written email helps us know
          you're the right match! Please answer the following:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-3 mb-4">
          <li>🏠 Where do you live and what’s your home setup?</li>
          <li>👨‍👩‍👧‍👦 Do you live with kids or other pets?</li>
          <li>🕐 What's your daily routine like?</li>
          <li>🐾 Why do you want to adopt {petName}?</li>
          <li>🦴 What experience do you have with dogs?</li>
        </ul>

        <p className="text-gray-500 text-sm italic mb-6">
          Bonus: Attach any pictures of your home or yard, if you'd like!
        </p>

        <a
          href={mailtoLink}
          className="bg-purple-800 hover:bg-[#9990DA] text-white font-semibold px-5 py-3 rounded-full shadow-md transition duration-300 ease-in-out flex items-center justify-center w-full"
        >
          Let's go!
        </a>
      </div>
    </div>
  );
};

export default AdoptionEmailModal;
