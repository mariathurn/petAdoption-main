// src/client/src/pages/home.tsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Steps from "../components/steps";
import DiscountedFoodList from "../components/discountedFoodList";

export default function Home() {
  const navigate = useNavigate();
  const { firstName } = useAuth();

  return (
    <div>
      {firstName && (
        <h1 className="text-2xl bg-white font-bold text-purple-700 text-center py-6">
          Hi {firstName}!
        </h1>
      )}

      <DiscountedFoodList />

      <section className="bg-white py-8 px-12 sm:px-42 flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Give a New Life to <br />
            <span className="text-purple-700">
              Furry <span className="font-extrabold">Friends</span>
            </span>
          </h1>
          <p className="text-gray-600 mb-6">
            Pet adoption and rehoming are both vital aspects of animal welfare,
            offering hope and a fresh start to pets in need. Open your heart and
            your home to a shelter pet.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/pets")}
              className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 cursor-pointer transition"
            >
              Adopt Now
            </button>
          </div>
        </div>
        <img
          src="/dogAndCat.png"
          alt="Dog and Cat"
          className="hidden sm:block mt-8 lg:mt-0 w-96"
        />
      </section>

      <Steps />

      <section className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-8">
          Still Have Questions? <br />
          <span className="text-purple-700">Check Our FAQ</span>
        </h2>

        <div
          className="max-w-xl mx-auto bg-purple-50 hover:bg-purple-100 transition-all cursor-pointer shadow-md rounded-lg p-6 flex items-center space-x-4"
          onClick={() => navigate("/faq")}
        >
          <div className="bg-purple-200 p-4 rounded-full">{/* icon */}</div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-purple-800">
              Visit Our FAQ
            </h3>
            <p className="text-sm text-gray-600">
              Find answers to the most common questions about adoption,
              rehoming, and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
