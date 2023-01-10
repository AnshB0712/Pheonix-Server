const Dish = require("../../models/Dish")
const { BadRequestError } = require('../../errors')

const addADish = async (req,res) => {
    const {id,parts,...data} = req.body
    const filteredParts = parts?.map(obj => obj.value)
    await Dish.create({...data,parts: filteredParts || []})
    res.status(201).json({
        message:"Dish created successfully!"
    })
}
const updateADish = async (req,res) => {
    const {_id,updatedAt,created_at,...data} = req.body

    if(!_id)
        throw new BadRequestError('ID is required to update the item.')

    await Dish.findByIdAndUpdate(_id,data)
    res.status(200).json({
        message:"Dish Updated successfully!"
    })
}
const deleteADish = async (req,res) => {
    const {id} = req.query
    
    if(!id)
        throw new BadRequestError('ID is required to delete the item.')

    await Dish.findByIdAndDelete(id)
    res.status(202).json({
        message:"Dish Deleted successfully!"
    })
}

module.exports = {addADish,updateADish,deleteADish}