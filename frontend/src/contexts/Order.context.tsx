import { PropsWithChildren, createContext, useState } from "react";
import { PostOrderDTO, ProductOrderDTO } from "../hooks/common";
import { v4 as uuidv4 } from 'uuid';
// Define the context type
type ContextType = {
  orderDTO: PostOrderDTO;
  addProductOrderDTO: (productOrderDTO: ProductOrderDTO) => void;
  removeProductOrderDTO: (productId: string) => void;
  removeAllProducts: () => void;
};

// Create the initial context value
const initialContextValue: ContextType = {
  orderDTO: {
    clientName: uuidv4(),
    productsIncluded: [],
  },
  addProductOrderDTO: () => {},
  removeProductOrderDTO: () => {},
  removeAllProducts: () => {},
};

// Create the context
export const OrderContext = createContext<ContextType>(initialContextValue);

// Create the context provider component
export const OrderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [orderDTO, setOrderDTO] = useState<PostOrderDTO>(
    initialContextValue.orderDTO
  );

  const addProductOrderDTO = (productOrderDTO: ProductOrderDTO) => {
    setOrderDTO((prevOrderDTO) => ({
      ...prevOrderDTO,
      productsIncluded: [...prevOrderDTO.productsIncluded, productOrderDTO],
    }));
  };

  const removeProductOrderDTO = (productId: string) => {
    setOrderDTO((prevOrderDTO) => ({
      ...prevOrderDTO,
      productsIncluded: prevOrderDTO.productsIncluded.filter(
        (product) => product.productId !== productId
      ),
    }));
  };

  const removeAllProducts = () => {
    setOrderDTO(initialContextValue.orderDTO);
  }

  return (
    <OrderContext.Provider
      value={{ orderDTO, addProductOrderDTO, removeProductOrderDTO, removeAllProducts }}
    >
      {children}
    </OrderContext.Provider>
  );
};