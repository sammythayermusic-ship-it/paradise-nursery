import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const img = (seed) => 'https://picsum.photos/seed/' + seed + '/300/200';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('spider-plant'), description: 'Filters formaldehyde and xylene.', cost: 12 },
      { name: 'Peace Lily', image: img('peace-lily'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('boston-fern'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: img('rubber-plant'), description: 'Easy to grow and cleans the air.', cost: 17 },
      { name: 'Aloe Vera', image: img('aloe-vera'), description: 'Purifies the air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), description: 'Calming scent, used in aromatherapy.', cost: 20 },
      { name: 'Jasmine', image: img('jasmine'), description: 'Sweet fragrance that fills a room.', cost: 18 },
      { name: 'Rosemary', image: img('rosemary'), description: 'Woody scent, great in the kitchen.', cost: 15 },
      { name: 'Mint', image: img('mint'), description: 'Fresh smell and useful for tea.', cost: 12 },
      { name: 'Lemon Balm', image: img('lemon-balm'), description: 'Citrus scent that helps you relax.', cost: 14 },
      { name: 'Hyacinth', image: img('hyacinth'), description: 'Strong floral fragrance in spring.', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zz-plant'), description: 'Thrives with very little light and water.', cost: 25 },
      { name: 'Pothos', image: img('pothos'), description: 'Hardy vine that grows almost anywhere.', cost: 10 },
      { name: 'Cast Iron Plant', image: img('cast-iron'), description: 'Nearly impossible to kill.', cost: 28 },
      { name: 'Jade Plant', image: img('jade-plant'), description: 'Succulent that stores water in its leaves.', cost: 16 },
      { name: 'Philodendron', image: img('philodendron'), description: 'Forgiving and fast growing.', cost: 19 },
      { name: 'Ponytail Palm', image: img('ponytail-palm'), description: 'Drought tolerant and slow growing.', cost: 24 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <a onClick={onHomeClick}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>Cart</a>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 <span className="cart-count">{totalQuantity}</span>
        </div>
      </nav>

      {!showCart ? (
        <div>
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>${plant.cost}</p>
                    <button disabled={isInCart(plant.name)} onClick={() => handleAddToCart(plant)}>
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
