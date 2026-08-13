import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Products from "../../pages/Products";

vi.mock("../../hooks/useAxiosSecure", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/shared/Product", () => ({
  default: ({ product }) => (
    <article data-testid="product-card">{product.title}</article>
  ),
}));

const products = [
  {
    _id: "cuban-low",
    title: "Silver Stride Shirt",
    category: "Cuban",
  },
  {
    _id: "formal-low",
    title: "Formal White Shirt",
    category: "Formal",
  },
  {
    _id: "cuban-high",
    title: "Desert Sand Shirt",
    category: "Cuban",
  },
  {
    _id: "full-sleeve",
    title: "Stone Gray Shirt",
    category: " Full Sleeve ",
  },
  {
    _id: "uncategorized",
    title: "Uncategorized Shirt",
    category: "",
  },
];

let mockAxios;

beforeEach(() => {
  vi.clearAllMocks();

  mockAxios = {
    get: vi.fn().mockResolvedValue({ data: products }),
  };

  useAxiosSecure.mockReturnValue(mockAxios);
});

const renderProducts = (url = "/products") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Products />
    </MemoryRouter>,
  );

test("builds unique category options from backend product data", async () => {
  renderProducts();

  const categoryFilter = await screen.findByRole("combobox", {
    name: "Filter by Category",
  });
  const options = within(categoryFilter).getAllByRole("option");

  expect(options.map((option) => option.textContent)).toEqual([
    "All Categories",
    "Cuban",
    "Formal",
    "Full Sleeve",
  ]);

  expect(mockAxios.get).toHaveBeenCalledWith("/products", {
    signal: expect.any(AbortSignal),
    params: {
      search: "",
      sort: "newest",
      view: "card",
    },
  });
});

test("filters the server-sorted products by category without another request", async () => {
  const user = userEvent.setup();

  renderProducts("/products?sort=price-asc");

  const categoryFilter = await screen.findByRole("combobox", {
    name: "Filter by Category",
  });

  await user.selectOptions(categoryFilter, "Cuban");

  const visibleProducts = screen.getAllByTestId("product-card");

  expect(visibleProducts.map((product) => product.textContent)).toEqual([
    "Silver Stride Shirt",
    "Desert Sand Shirt",
  ]);
  expect(screen.getByText("2 products found")).toBeInTheDocument();
  expect(screen.queryByText("Formal White Shirt")).not.toBeInTheDocument();
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith("/products", {
    signal: expect.any(AbortSignal),
    params: {
      search: "",
      sort: "price-asc",
      view: "card",
    },
  });
});

test("keeps the selected category when the sort changes", async () => {
  const user = userEvent.setup();

  renderProducts("/products?category=Cuban");

  const categoryFilter = await screen.findByRole("combobox", {
    name: "Filter by Category",
  });
  const sortSelect = screen.getByRole("combobox", {
    name: "Sort Products",
  });

  expect(categoryFilter).toHaveValue("Cuban");

  await user.selectOptions(sortSelect, "price-desc");

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenLastCalledWith("/products", {
      signal: expect.any(AbortSignal),
      params: {
        search: "",
        sort: "price-desc",
        view: "card",
      },
    });
  });

  expect(categoryFilter).toHaveValue("Cuban");
});
