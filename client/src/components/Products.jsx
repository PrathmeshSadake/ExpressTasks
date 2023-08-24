import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "../api";

function Products() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["products"], queryFn: getProducts });

  // Mutations
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}rs</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: "123",
            name: "",
            category: "",
            price: 1,
            quantity: 123,
          });
        }}
      >
        Add Item
      </button>
    </div>
  );
}

export default Products;
