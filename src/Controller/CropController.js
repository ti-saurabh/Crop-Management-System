const Crop = require("../Model/Crop");


const createcrop = async function (req, res) {

  cropdata = await Crop.create(req.body);

  return res.send({ message: "Crop Created", data: cropdata });
};


const getCrop = async function (req, res) {

  let cropData = await Crop.find();

  return res.send({ data: cropData });
};



module.exports = { createcrop, getCrop };
