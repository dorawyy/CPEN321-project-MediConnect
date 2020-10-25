const findById = (req, res) => {
  const id = req.params.id;
  res.send(id);
};

const getAttribute = (req, res) => {
  const id = req.params.id;
  const attr = req.params.attribute;
  res.send(id + ", " + attr);
};

const setAttribute = (req, res) => {
  const id = req.params.id;
  const attr = req.params.attribute;
  const newVal = req.params.newVal;
  const success;
  // change so that json object is sent to front end denoting success or failure
  res.send((success) ? true : false);
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  res.send(id + " deleted");
};

const deleteAttribute = (req, res) => {
  const id = req.params.id;
  const attr = req.params.attribute;
  // Check if attribute is required or not, and delete if not required
  res.send(id + ", " + attr + " deleted");
};