import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import DogBreedSelector from "../DogBreedSelector/DogBreedSelector";

const Container: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [clickedNext, setClickedNext] = useState<boolean>(false);

  return (
    <AnimatePresence>
      {clickedNext === false && (
        <DogBreedSelector
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          setClickedNext={setClickedNext}
        />
      )}
    </AnimatePresence>
  );
};

export default Container;
