import axios from "axios";

const createData = async (newData) => {
  try {
    const response = await axios.post("http://localhost:8000/data", newData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createData;