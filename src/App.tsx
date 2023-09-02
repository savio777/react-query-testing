import { useQuery } from "react-query";
import axios from "axios";

import "./App.css";
import { useState } from "react";

const getUser = async (id: number) => {
  const response = await axios.get(`https://reqres.in/api/users/${id}?delay=5`);

  if (!response?.data?.data) {
    throw new Error("Erro na requisição");
  }

  return response.data.data as IUser;
};

function App() {
  const [idUser, setIdUser] = useState(1);

  const { data, isError, isLoading, error } = useQuery(["users", idUser], () =>
    getUser(idUser)
  );

  if (isError) {
    return (
      <div>
        <h1>{JSON.stringify(error)}</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div>
      <img src={data?.avatar} alt={data?.first_name} />

      <h2>
        {data?.first_name} {data?.last_name} (#{data?.id})
      </h2>

      <h3>{data?.email}</h3>

      <div>
        <button onClick={() => setIdUser((prevState) => prevState - 1)}>
          previous
        </button>
        <button onClick={() => setIdUser((prevState) => prevState + 1)}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
