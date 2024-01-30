import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductDetail from "../../../pages/ProductDetail/ProductDetail";

describe("Product Detail Page", () => {
  test("renders back button", () => {
    render(<ProductDetail />);
    const pageParagraph = screen.getByRole("button");
    expect(pageParagraph).toBeInTheDocument();
  });
  test("renders h2", () => {
    render(<ProductDetail />);

    const pageHeading = screen.getByRole("heading", {
      level: 2,
    });
    expect(pageHeading).toBeInTheDocument();
  });
  test("renders image", () => {
    render(<ProductDetail />);

    const image = screen.getByRole("product-image");
    expect(image).toBeInTheDocument();
  });

  test("renders p", () => {
    render(<ProductDetail />);

    const paragraph = screen.getByTestId("paragraph");
    expect(paragraph).toBeInTheDocument();
  });
});
