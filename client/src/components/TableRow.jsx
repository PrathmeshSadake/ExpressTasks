import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

/* eslint-disable react/prop-types */
const TableRow = ({ product }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (quantity) => {
      const { data } = await axios.patch(
        `http://localhost:8000/${product.id}`,
        {
          quantity,
        }
      );
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return (
    <tr>
      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
        {product.name}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {product.price}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {product.category}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {product.quantity}
      </td>
      <td className='flex space-x-1 relative whitespace-nowrap py-4 text-sm font-medium'>
        <button
          onClick={() => mutate(1)}
          className='py-1 px-2 bg-indigo-500 text-white'
        >
          Buy 1
        </button>
        <button
          onClick={() => mutate(2)}
          className='py-1 px-2 bg-indigo-500 text-white'
        >
          Buy 2
        </button>
        <button
          onClick={() => mutate(3)}
          className='py-1 px-2 bg-indigo-500 text-white'
        >
          Buy 3
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
