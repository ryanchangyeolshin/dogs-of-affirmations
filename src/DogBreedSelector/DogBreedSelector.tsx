import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import dogBreeds from "../../static/dogBreed";

interface DogBreedSelectorProps {
  selectedBreed: string | null;
  setSelectedBreed: (breed: string | null) => void;
  onClickNextHandler: () => void;
}

const DogBreedSelector: React.FC<DogBreedSelectorProps> = ({
  selectedBreed,
  setSelectedBreed,
  onClickNextHandler,
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<string[]>([]);

  useEffect(() => {
    setBreeds(dogBreeds);
    setFiltered(dogBreeds);
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(breeds.filter((b) => b.toLowerCase().includes(q)));
  }, [search, breeds]);

  const searchTypeHandler = (breed: string) => {
    setSelectedBreed(null);
    setSearch(breed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 1 }}
      className="w-full max-w-lg min-w-60% min-h-[60vh] max-h-60% mx-auto mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10 text-white space-y-6 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white-800 text-center">
        Select a Dog Breed
      </h2>

      <input
        type="text"
        value={search}
        onChange={(e) => searchTypeHandler(e.target.value)}
        placeholder="Search dog breeds..."
        className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {selectedBreed === null && search !== "" && (
        <div className="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-white/5">
          {filtered.length === 0 && (
            <p className="p-4 text-gray-500 text-center">No breeds found.</p>
          )}

          <ul className="h-100% overflow-y-auto rounded-lg border border-white/10 bg-white/5">
            {filtered.map((breed) => (
              <li
                key={breed}
                onClick={() => {
                  setSelectedBreed(breed);
                  setSearch(breed);
                }}
                className={`cursor-pointer w-full text-left px-4 py-2 hover:bg-white/20 text-white capitalize ${
                  selectedBreed === breed ? "bg-white/30" : ""
                }`}
              >
                {breed}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        disabled={!selectedBreed}
        className={`mt-auto w-full py-3 text-lg font-semibold rounded-lg transition-colors duration-300 border ${
          selectedBreed
            ? "bg-indigo-500 text-white border-white hover:bg-white hover:text-indigo-500 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed border-transparent"
        }`}
        onClick={onClickNextHandler}
      >
        Next
      </button>
    </motion.div>
  );
};

export default DogBreedSelector;
