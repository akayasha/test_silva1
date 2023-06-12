const readData = (data, id) => {
  const item = data.find((item) => item.id === id);
  if (item) {
    alert(`ID: ${item.id}, Days: ${item.days}, Activity: ${item.activity}`);
  } else {
    alert("Item not found!");
  }
};

export default readData;