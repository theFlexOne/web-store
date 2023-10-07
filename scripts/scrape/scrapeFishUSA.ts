import axios, { AxiosResponse } from "axios";
import fs from "fs";
import { categoryHierarchies } from "./constants";
import { FishUSAProduct } from "./types/FishUSAProduct.types";

const FETCH_URL =
  "https://vw1136.a.searchspring.io/api/search/search.json?siteId=vw1136&resultsFormat=native";

run();

async function run() {
  const products = await fetchFishUSAProducts();

  fs.writeFileSync(
    "scripts/scrape/data/products.json",
    JSON.stringify(products, null, 2)
  );
}

function formatFishUSAProducts(products: FishUSAProduct[]) {

async function fetchFishUSAProducts() {
  try {
    const fetchList: Promise<AxiosResponse<unknown, unknown>>[] = [];
    for (const topCategory in categoryHierarchies) {
      const subCategories = categoryHierarchies[topCategory];
      for (const subCategory in subCategories) {
        const categoryHierarchy = subCategories[subCategory];
        const url = buildUrl(categoryHierarchy);
        const response = axios.get(url);
        fetchList.push(response);
      }
    }
    const responses: AxiosResponse<unknown, unknown>[] = await Promise.all(
      fetchList
    );
    const products = responses.flatMap((response) => response.data.results);
    return products;
  } catch (error) {
    console.error(error);
  }
}

function buildUrl(categoryHierarchy: string, page = 1, resultsPerPage = 96) {
  const url = new URL(FETCH_URL);
  url.searchParams.append("bgfilter.categories_hierarchy", categoryHierarchy);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("resultsPerPage", resultsPerPage.toString());
  return url.toString();
}

async function saveHTML() {
  const url = "https://www.fishusa.com/Fishing/Fishing-Rods/Spinning-Rods/";
  const response = await axios.get(url);
  fs.writeFileSync("Fishing-Rods_Spinning-Rods.html", response.data);
}


