import { useState } from 'react';

export default function SubPanel() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Hello from React Plugin!</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
