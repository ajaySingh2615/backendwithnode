import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add new data
app.post("/teas", (req, res) => {
  console.log("add new data");
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all the data
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get by id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found!");
  }
  res.status(200).send(tea);
});

// update
app.put("/teas/:id", (req, res) => {
  console.log("update log");
  console.log(req.params.id);
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  console.log("tea id is :", tea);

  if (!tea) {
    return res.status(404).send("tea not found!");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.slice(index, 1);
  return res.status(204).send("deleted!");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
