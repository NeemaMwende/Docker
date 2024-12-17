// import { useEffect, useState } from 'react'
// // import './App.css';


// function App() {
//   const [blogs, setBlogs] = useState([])
//   useEffect(() => {
//     fetch('http://localhost:4000')
//       .then(res => res.json())
//       .then(data => setBlogs(data))
//   }, [])

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>all blogs</h1>
//         {blogs && blogs.map(blog => (
//           <div key={blog.id}>{blog.title}</div>
//         ))}
//       </header>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>All Blogs</h1>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id}>{blog.title}</div>
          ))
        ) : (
          !loading && !error && <p>No blogs available.</p>
        )}
      </header>
    </div>
  );
}

export default App;
