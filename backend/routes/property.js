const express = require("express");
const router = express.Router();

const cloudinary = require("../utils/cloudinary");
const Properties = require("../models/propertyModel");
const Realtor = require("../models/realtorModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/uploadProperty", authMiddleware,async (req, res) => {
  const { image, title, description, location, city, state, price, dimensions, realtorMobile, realtorEmail } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      const uploaderEmail = req.user.email;
      if (uploadRes) {
        const property = new Properties({
          image: uploadRes.url,
          title,
          description,
          location,
          city,
          state,
          price,
          dimensions,
          realtorEmail: uploaderEmail,
          realtorMobile,
        });

        await property.save();

        const email = req.user.email;
        const realtorDocs = await Realtor.findOne({email: email});

        if(!realtorDocs.properties){
          realtorDocs.properties = [{}]
        }
        const propertyId = await Properties.findOne({description});
        realtorDocs.properties.push(propertyId);
        await realtorDocs.save();

        res.status(200).json({ msg: "Property uploaded successfully" });
      } else {
        res.json({ msg: "Error uploading image" });
      }
    } else {
      res.json({  msg: "Image data is required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({  msg: "Internal Server Error" });
  }
});
  

router.get("/getAllProperties", async (req, res) => {
    try {
        const allProperties = await Properties.find();
        res.json(allProperties);
    } catch (error) {
        console.error("Error getting all properties:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;