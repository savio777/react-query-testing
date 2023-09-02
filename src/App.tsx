import { useQuery } from "react-query";
import axios from "axios";

import "./App.css";

const userIdMock = "savio777";

const getUser = async (id: string) => {
  const response = await axios.get(`https://api.github.com/users/${id}`);

  if (!response?.data) {
    throw new Error("Erro na requisição");
  }

  return response.data as IUser;
};

function App() {
  const { data, isError, isLoading, error } = useQuery(
    ["users", userIdMock],
    () => getUser(userIdMock)
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
      <img src={data?.avatar_url} alt={data?.name} />

      <h2>
        {data?.name} ({data?.login})
      </h2>

      <h3>{data?.bio}</h3>

      <h5>{data?.email}</h5>
    </div>
  );
}

export default App;
