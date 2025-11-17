import { useEffect, useState } from "react";
import DogBreedSelector from "../DogBreedSelector/DogBreedSelector";

type Quote = {
    text: string;
    author?: string;
};

const Container = () => {
  return (
    <div>
        <DogBreedSelector />
    </div>
  )
};

export default Container;
