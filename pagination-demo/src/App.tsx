import { useState, useEffect } from "react";
function App() {

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }

  const [user, setUser] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async() => {
    try{
      setLoading(true);
      const limit = 10;
      const skip = (page-1) * limit;

      const response = await fetch (
          `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );

      const data = await response.json();
      console.log("Users fetched.", data);

      setUser(data.users);
      setTotalPages(Math.ceil(data.total/limit));
    }
    catch (error){
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  },[page]);

  if (loading){
    return <h2>Loading...</h2>
  }


  return (
    <div>
      {user.map((user) => (
        <div key={user.id}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <p>{user.email}</p>
          <p>{user.age}</p>
        </div>
      ))}
      
      <button disabled={page===1}
      onClick={() => setPage(page-1)}
      >  Previous
      <span>
        Page {page} of{totalPages}
      </span>
      </button>

      <button disabled= {page===totalPages}
      onClick={() => setPage(page+1)}
      >Next
      </button>
    </div>

    
  )
}

export default App
