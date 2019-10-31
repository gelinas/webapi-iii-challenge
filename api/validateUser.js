module.exports = validateUser;

// `validateUser` validates the `body` on a request to create a new user
// if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
// if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
function validateUser(req, res, next) {
  const { body } = req.body;
  if (!body) {
    res.send(400).json({ message: "missing user data"})
  }
  if (!body.name) {
    res.send(400).json({ message: "missing required name field"})
  }
  next();
}