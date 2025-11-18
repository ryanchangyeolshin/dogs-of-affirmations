import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DogBreedSelector from "../DogBreedSelector/DogBreedSelector";
import DogResults from "../DogResults/DogResults";
import type {
  DogAPIResponseType,
  MotivationalQuoteResponseType,
} from "../types/interfaces";

const apiUrl: string = import.meta.env.VITE_API_NINJAS_API_URL;
const apiKey: string = import.meta.env.VITE_API_NINJAS_API_KEY;

type FetchRandomDogImageFunction = () => Promise<
  DogAPIResponseType | undefined
>;
type FetchMotivationalQuoteFunction = () => Promise<
  MotivationalQuoteResponseType | undefined
>;
type ConvertSelectedBreedToURIFunction = (
  selectedBreed: string | null
) => string | null;
type OnClickHandlerFunction = () => void;

const Container: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [clickedNext, setClickedNext] = useState<boolean>(false);
  const [dogImage, setDogImage] = useState<string>("");
  const [motivationalQuote, setMotivationalQuote] =
    useState<MotivationalQuoteResponseType | null>(null);

  const convertSelectedBreedToURI: ConvertSelectedBreedToURIFunction = (
    selectedBreed: string | null
  ) => {
    if (selectedBreed?.includes(" ")) {
      return selectedBreed?.split(" ").reverse().join("/").toLowerCase();
    }
    return selectedBreed;
  };

  const fetchRandomDogImage: FetchRandomDogImageFunction = async () => {
    try {
      const uriBreed: string | null = convertSelectedBreedToURI(selectedBreed);
      const res = await fetch(
        `https://dog.ceo/api/breed/${uriBreed}/images/random`
      );
      const dogImageData: DogAPIResponseType = await res.json();
      return dogImageData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  const fetchRandomMotivationalQuote: FetchMotivationalQuoteFunction =
    async () => {
      try {
        const res = await fetch(apiUrl, {
          headers: {
            "X-Api-Key": apiKey,
          },
        });
        const motivationalQuotesData: MotivationalQuoteResponseType[] =
          await res.json();
        return motivationalQuotesData[0];
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred:", error);
        }
      }
    };

  const onClickNextHandler: OnClickHandlerFunction = async () => {
    setClickedNext(true);
    const randomDogImage: DogAPIResponseType | undefined =
      await fetchRandomDogImage();
    if (randomDogImage) setDogImage(randomDogImage?.message);
    const randomMotivationalQuote: MotivationalQuoteResponseType | undefined =
      await fetchRandomMotivationalQuote();
    if (randomMotivationalQuote) setMotivationalQuote(randomMotivationalQuote);
  };

  return (
    <AnimatePresence>
      {clickedNext === false ? (
        <DogBreedSelector
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          onClickNextHandler={onClickNextHandler}
        />
      ) : (
        <DogResults dogImage={dogImage} motivationalQuote={motivationalQuote} />
      )}
    </AnimatePresence>
  );
};

export default Container;
