const { check, validationResult } = require("express-validator");

exports.postValidator = [
  check("title").trim().not().isEmpty().withMessage("post title is missing!"),
  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("post conten is missing!"),
  check("meta").trim().not().isEmpty().withMessage("meta title is missing!"),
  check("slug").trim().not().isEmpty().withMessage("post slug is missing!"),
  check("tags")
    .isArray()
    .withMessage("Tag must be array of string !")
    .custom((tags) => {
      for (let t of tags) {
        if (typeof t != "string") {
          throw Error("Tags mus be array of string!");
        }
      }
      return true;
    }),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  console.log(req.body);
  if (error.length) {
    return res.status(401).json({ error: error[0].msg });
  }
  next();
};
