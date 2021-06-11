import axios from "axios";
const apiEndpoint = "http://128.199.195.196:3001/";
const options = {
  headers: {
    Authorization: "Bearer iqi509189dxznal;,ggi",
  },
};

export async function getRestaurants() {
  const data = await axios.get(apiEndpoint, options);
  return data;
}
