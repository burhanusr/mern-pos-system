import axiosInstance from "./axiosConfig";

export const getAllProducts = async (query) => {
  let endpoint = "api/v1/products";

  const { category, tag } = query;

  if (category) {
    endpoint += `?category=${query.category.query}`;
  }

  if (tag) {
    endpoint += `?tags=${query.tag.query}`;
  }

  const response = await axiosInstance.get(endpoint);
  return response.data;
};
