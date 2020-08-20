const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  listBankController,
  createBankController,
  deleteBankController,
  updateBankController,
} = require("../controllers/banks");
const BankModel = require("../models/bank");

router.get("/bank/:id?", listBankController);
router.post("/bank", [
  body("name").trim().not().isEmpty().withMessage("Name Cannot be empty"),
  body("location").trim().not().isEmpty().withMessage("Branch Cannot be empty"),
  body("branch").trim().not().isEmpty().withMessage("Branch Cannot be empty"),
  body("phone").isMobilePhone("en-GH")
  .custom((value, {req})=>{
    return BankModel.findOne({"phone":value}).then(
      bankDoc =>{
        if(bankDoc)
        return Promise.reject("Phone number already taken")
      }
    )
  })
], createBankController);
router.put("/bank", updateBankController);
router.delete("/bank", deleteBankController);

module.exports = router;
