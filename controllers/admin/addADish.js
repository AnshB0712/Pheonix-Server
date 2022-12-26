const Dish = require("../../models/Dish")

const addADish = async (req,res) => {
    await Dish.create({...req.body})
    res.status(201).json({
        message:"Dish created successfully!"
    })
}
const updateADish = async (req,res) => {
    const {id,...data} = req.body
    await Dish.findByIdAndUpdate(id,data)
    res.status(200).json({
        message:"Dish Updated successfully!"
    })
}
const deleteADish = async (req,res) => {
    const {id} = req.body
    await Dish.findByIdAndDelete(id)
    res.status(202).json({
        message:"Dish Deleted successfully!"
    })
}

module.exports = {addADish,updateADish,deleteADish}