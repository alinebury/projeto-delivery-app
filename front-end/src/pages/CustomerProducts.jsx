import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';
import HeaderClient from '../components/HeaderClient';
// import { getCartProducts } from '../services/localStorage';
import Products from '../components/Products';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const { products, getProducts, cart } = useContext(myContext);
  const [buttonCart, setButtonCart] = useState(true);

  const totalCart = cart.reduce((acc, item) => acc + Number(item.total), 0)
    .toFixed(2).replace('.', ',');

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setButtonCart(
      totalCart === '0,00',
    );
  }, [totalCart]);

  return (
    <>
      <HeaderClient />
      { products.map((product) => <Products key={ product.id } product={ product } />) }
      <button
        type="button"
        // data-testid="customer_products__checkout-bottom-value"
        data-testid="customer_products__button-cart"
        disabled={ buttonCart }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span
          // data-testid="customer_products__button-cart"
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalCart }
        </span>
      </button>
    </>
  );
}
