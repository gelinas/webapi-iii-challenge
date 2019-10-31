module.exports = validatePost;

// `validatePost` validates the `body` on a request to create a new post
// if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
// if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
function validatePost(req, res, next) {
  const { body } = req.body;
  if (!body) {
    res.send(400).json({ message: "missing post data" })
  }
  if (!body.text) {
    res.send(400).json({ message: "missing required text field" })
  }
  next();
}