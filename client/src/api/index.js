import axios from "axios";
export const getProducts = async () => {
  const { data } = await axios.get("http://localhost:8000");
  return data;
};
export const createProduct = async ({
  category,
  id,
  name,
  price,
  quantity,
}) => {
  const { data } = await axios.post("http://localhost:8000", {
    category,
    id,
    name,
    price,
    quantity,
  });
  return data;
};
