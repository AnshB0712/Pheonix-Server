const Dish = require("../../models/Dish")

const getAllDishes = async (req,res) => {
    const { category } = req.query
    const data = await Dish.find(category==='all' ? {} : {category} )
    return res.status(200).json({
        data,
        message:"Request Successful."
    })
}

module.exports = getAllDishes