const Dish = require("../../models/Dish")

const getAllDishes = async (req,res) => {
    const { category } = req.query
    const data = await Dish.find(category==='all' ? {} : {category} )
    res.status(200).json({
        data,
        message:"Request Successful."
    })
    return
}

module.exports = getAllDishes