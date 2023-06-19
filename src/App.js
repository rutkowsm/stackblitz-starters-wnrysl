import React, { useState, useMemo } from 'react';
import './style.css';

const EvenNumbersList = () => {
  const evenNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 2; i <= 100; i += 2) {
      numbers.push(i);
    }
    return numbers;
  }, []);

  return (
    <div>
      <h2>Lista liczb parzystych:</h2>
      <ul>
        {evenNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Pralka', price: 1800 },
    { id: 2, name: 'Suszarka', price: 1450 },
    { id: 3, name: 'Toster', price: 150 },
    { id: 4, name: 'Lodówka', price: 2200 },
    { id: 5, name: 'TV', price: 3200 },
    { id: 6, name: 'Żelazko', price: 280 },
    { id: 7, name: 'Ekspres do kawy', price: 850 },
    { id: 8, name: 'Odkurzacz', price: 435 },
  ]);

  const [sortDirection, setSortDirection] = useState('asc');

  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return sorted;
  }, [products, sortDirection]);

  const handleSortChange = (e) => {
    setSortDirection(e.target.value);
  };

  return (
    <div>
      <h2>Lista produktów:</h2>
      <label>
        Sortowanie:
        <select value={sortDirection} onChange={handleSortChange}>
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </label>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} PLN
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserTable = ({ users }) => {
  const [filterName, setFilterName] = useState('');
  const [filterSurname, setFilterSurname] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase()) &&
        user.surname.toLowerCase().includes(filterSurname.toLowerCase())
    );
  }, [users, filterName, filterSurname]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    return sorted;
  }, [filteredUsers, sortDirection]);

  const handleNameFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleSurnameFilterChange = (e) => {
    setFilterSurname(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortDirection(e.target.value);
  };

  return (
    <div>
      <h2>Tabela użytkowników:</h2>
      <label>
        Filtruj po imieniu:
        <input
          type="text"
          value={filterName}
          onChange={handleNameFilterChange}
        />
      </label>
      <label>
        Filtruj po nazwisku:
        <input
          type="text"
          value={filterSurname}
          onChange={handleSurnameFilterChange}
        />
      </label>
      <label>
        Sortowanie:
        <select value={sortDirection} onChange={handleSortChange}>
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Wiek</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const users = [
    { id: 1, name: 'Alex', surname: 'Birch', age: 25 },
    { id: 2, name: 'John', surname: 'Blake', age: 30 },
    { id: 3, name: 'Alice', surname: 'Johnson', age: 35 },
    { id: 4, name: 'Janice', surname: 'McMara', age: 38 },
    { id: 5, name: 'Shirley', surname: 'Perkins', age: 32 },
    { id: 6, name: 'Peter', surname: 'Williams', age: 29 },
  ];

  return (
    <div>
      <EvenNumbersList />
      <ProductList />
      <UserTable users={users} />
    </div>
  );
};

export default App;
