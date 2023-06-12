import axios from "axios";

const deleteData = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/data/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default deleteData;