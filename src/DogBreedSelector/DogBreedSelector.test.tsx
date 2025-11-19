import { fireEvent, render, screen } from "@testing-library/react";
import DogBreedSelector from "./DogBreedSelector";

// Vitest mock
vi.mock("../../static/dogBreed", () => ({
  default: ["labrador", "poodle"],
}));


describe("DogBreedSelector", () => {
  let selectedBreed: string | null;
  const setSelectedBreed = vi.fn((breed) => (selectedBreed = breed));
  const onClickNextHandler = vi.fn();

  beforeEach(() => {
    selectedBreed = null;
    setSelectedBreed.mockClear();
    onClickNextHandler.mockClear();
  });

  test("renders title", () => {
    render(
      <DogBreedSelector
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        onClickNextHandler={onClickNextHandler}
      />
    );
    expect(screen.getByText("Select a Dog Breed")).toBeInTheDocument();
  });

  test("filters breeds on search input", () => {
    render(
      <DogBreedSelector
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        onClickNextHandler={onClickNextHandler}
      />
    );

    const input = screen.getByPlaceholderText("Search dog breeds...");
    fireEvent.change(input, { target: { value: "lab" } });

    expect(screen.getByText("labrador")).toBeInTheDocument();
    expect(screen.queryByText("poodle")).not.toBeInTheDocument();
  });

  test("clicking a breed selects it", () => {
    render(
      <DogBreedSelector
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        onClickNextHandler={onClickNextHandler}
      />
    );

    const input = screen.getByPlaceholderText("Search dog breeds...");
    fireEvent.change(input, { target: { value: "poodle" } });

    const breedOption = screen.getByText("poodle");
    fireEvent.click(breedOption);

    expect(setSelectedBreed).toHaveBeenCalledWith("poodle");
  });

  test("Next button is disabled until a breed is selected", () => {
    render(
      <DogBreedSelector
        selectedBreed={null}
        setSelectedBreed={setSelectedBreed}
        onClickNextHandler={onClickNextHandler}
      />
    );

    const nextButton = screen.getByText("Next") as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  test("Next button calls handler when breed selected", () => {
    render(
      <DogBreedSelector
        selectedBreed="labrador"
        setSelectedBreed={setSelectedBreed}
        onClickNextHandler={onClickNextHandler}
      />
    );

    const nextButton = screen.getByText("Next") as HTMLButtonElement;
    expect(nextButton.disabled).toBe(false);

    fireEvent.click(nextButton);
    expect(onClickNextHandler).toHaveBeenCalledTimes(1);
  });
});
