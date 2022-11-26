//importing the required model
const imageGal = require("../../../model/imageGallery");

// create new image document in image_gallery collection
exports.createNewImage = function (req, res) {
  const newImg = new imageGal({
    title: req.body.title,
    image: "images/" + req.files[0].filename,
    description: req.body.description,
    categoryId: req.body.categoryId,
    stateId: req.body.stateId,
    districtId: req.body.districtId,
    createdBy: req.userId,
    modifiedBy: req.userId,
  });
  newImg.save(function (err, imge) {
    if (err) {
      res.status(400).json({ message: "Something went wrong..!" });
    }
    if (imge) {
      res.status(200).json({ message: "Image added successfully" });
    }
  });
};

// get an image document
exports.getImage = async function (req, res) {
  try {
    const imageResult = await imageGal.findById({ _id: req.body._id });
    if (imageResult) {
      res.status(200).json({ message: "Success", imageResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// get all the images in the image_gallery collection
exports.getAllImages = async function (req, res) {
  try {
    const imagesResult = await imageGal.find();
    if (imagesResult) {
      res.status(200).json({ message: "Success", imagesResult });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// update the image document by _id
exports.updateImage = async function (req, res) {
  try {
    const ImageResult = await imageGal.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        image: "images/" + req.files[0].filename,
        description: req.body.description,
        categoryId: req.body.categoryId,
        stateId: req.body.stateId,
        districtId: req.body.districtId,
        modifiedBy: req.userId,
      }
    );
    if (ImageResult) {
      res.status(200).json({ message: "Successfully updated" });
    }
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// delete a image document
exports.deleteImage = async function (req, res) {
  try {
    const delImag = await imageGal.findByIdAndRemove({ _id: req.body._id });
    if (delImag) {
      res.status(200).json({ message: "Successfully deleted " });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
