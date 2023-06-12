import axios from "axios";

const updateData = async (id, newData) => {
  try {
    await axios.put(`http://localhost:8000/data/${id}`, newData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default updateData;