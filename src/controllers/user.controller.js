const path = require("path");

const express = require("express");

const transporter = require("../configs/mail");

const User = require("../models/user.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10; // 30
    const skip = (page - 1) * pagesize;
    
    const users = await User.find()
      .skip(skip) // 30
      .limit(pagesize) // 31 - 60
      .lean()
      .exec();

      const totalPages = Math.ceil(
        (await User.find().countDocuments()) / pagesize
      );
      return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      transporter.sendMail({
        from: '"ABC admin" <admin@abc.com>', // sender address
        to: user.sellerEmail, // list of receivers
        subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`, // Subject line
        text: `Hi ${first_name}, Please confirm your email address create a set of admins`, // plain text body
        //   html: "<b>Hello sir/madam your product is successfully created</b>", // html body
        alternatives: [
          {
            contentType: "text/html",
            path: path.join(__dirname, "../mailers/product-created.mail.html"),
          }
        ],
      });
  
      return res.status(201).send({ message: "Product created successfully" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  module.exports = router;
  