import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts } from "../api";
import { useState } from "react";
import TableRow from "./TableRow";

function Products() {
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { status, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className='py-12 mx-auto max-w-6xl space-y-8'>
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          name='price'
          value={name}
          onChange={(e) => setname(e.target.value)}
          className='block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <input
          type='text'
          name='price'
          value={category}
          onChange={(e) => setcategory(e.target.value)}
          className='block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />{" "}
        <input
          type='number'
          name='price'
          value={price}
          onChange={(e) => setprice(e.target.value)}
          className='block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />{" "}
        <input
          type='number'
          name='price'
          value={quantity}
          onChange={(e) => setquantity(e.target.value)}
          className='block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
        <button
          onClick={() => {
            mutation.mutate({
              name,
              category,
              price,
              quantity,
            });
          }}
          className='rounded-md min-w-fit py-1.5 px-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white'
        >
          Add Item
        </button>
      </div>
      <div className='mx-auto max-w-5xl overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Category
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Price
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Quantity
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Purchase Quantity
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {data.map((product) => (
              <TableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
