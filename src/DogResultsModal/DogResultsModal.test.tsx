import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MotivationalQuoteResponseType } from "../types/interfaces";
import DogResultsModal from "./DogResultsModal";

// Mock framer-motion to avoid animation issues in testing
vi.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => <div {...props} />,
    img: (props: any) => <img {...props} />,
    p: (props: any) => <p {...props} />,
  },
}));

describe("DogResultsModal", () => {
  const dogImage: string = "https://example.com/dog.jpg";
  const motivationalQuote: MotivationalQuoteResponseType = {
    quote: "Stay positive!",
    author: "Doggo",
    categories: null,
    work: null,
  };

  let onClose: () => void;

  beforeEach(() => {
    onClose = vi.fn() as () => void;
  });

  it("renders the dog image", () => {
    render(
      <DogResultsModal
        dogImage={dogImage}
        motivationalQuote={null}
        onClose={onClose}
      />
    );

    const img = screen.getByAltText("Dog");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", dogImage);
  });

  it("renders the motivational quote", () => {
    render(
      <DogResultsModal
        dogImage={dogImage}
        motivationalQuote={motivationalQuote}
        onClose={onClose}
      />
    );

    expect(
      screen.getByText(
        `"${motivationalQuote.quote}" - ${motivationalQuote.author}`
      )
    ).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <DogResultsModal
        dogImage={dogImage}
        motivationalQuote={motivationalQuote}
        onClose={onClose}
      />
    );

    // backdrop = first div inside outer wrapper
    const backdrop =
      screen.getAllByRole("button", { hidden: true })[0] ??
      screen.getByTestId("backdrop");

    // safer: find the element with the backdrop class
    const overlay = document.querySelector(".bg-black\\/50");
    expect(overlay).toBeTruthy();

    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the Close button", () => {
    render(
      <DogResultsModal
        dogImage={dogImage}
        motivationalQuote={motivationalQuote}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when pressing Escape", () => {
    render(
      <DogResultsModal
        dogImage={dogImage}
        motivationalQuote={motivationalQuote}
        onClose={onClose}
      />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
