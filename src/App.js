import React, { useState, useEffect } from 'react';
import './App.css';

const productsList = [
  { id: 1, name: 'Ворона', price: 7999, category: 'птица' },
  { id: 2, name: 'Голубь', price: 2999, category: 'птица' },
  { id: 3, name: 'Воробей', price: 1999, category: 'птица' },
  { id: 4, name: 'Кошка', price: 12999, category: 'кошка' },
  { id: 5, name: 'Шаурма', price: 299, category: 'еда' },
  { id: 6, name: 'Чиабатта с лососем', price: 349, category: 'еда' },
  { id: 7, name: 'Миска риса', price: 249, category: 'еда' },
  { id: 8, name: 'Кому на Руси жить хорошо?', price: 99999, category: 'философия'},
  { id: 9, name: 'Жить или не жить, вот в чём вопрос...', price: 0.0001, category: 'философия' },
  { id: 10, name: 'Кот шрёдингера', price: 90909, category: 'кошка ли?' }
];


const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₽{product.price}</p>
      <span className="product-category">{product.category}</span>
    </div>
  );
};


const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category-select">Фильтр по категории:</label>
      <select 
        id="category-select"
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">Все категории</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};


const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  
  useEffect(() => {
    setProducts(productsList);
    setFilteredProducts(productsList);
    
    const uniqueCategories = [...new Set(productsList.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);


  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Каталог товаров</h1>
        <p>Найдите нужный товар по категории</p>
      </header>

      <main className="app-main">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">Товары не найдены</p>
          )}
        </div>

        <div className="products-info">
          <p>Показано товаров: {filteredProducts.length} из {products.length}</p>
        </div>
      </main>
    </div>
  );
};

export default App;