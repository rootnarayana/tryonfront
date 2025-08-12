import React, { useState } from 'react';
// tryin github
function TodoApp() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, date };

    const response = await fetch('https://tryonevenkat.azurewebsites.net/api/http_trigger1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, operation: 'add' })
    });

    if (response.ok) {
      setItems([...items, newItem]);
      setName('');
      setDate('');
    }
  };

  const handleRemove = async (itemToRemove) => {
    const response = await fetch('https://tryonevenkat.azurewebsites.net/api/http_trigger1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...itemToRemove, operation: 'remove' })
    });

    if (response.ok) {
      setItems(items.filter(item => item.name !== itemToRemove.name || item.date !== itemToRemove.date));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.name} - {item.date}
            <button onClick={() => handleRemove(item)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
