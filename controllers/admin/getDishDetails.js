const {BadRequestError} = require('../../errors');
const Dish = require('../../models/Dish');
const getDishDetails = async (req,res) => {
    const { id } = req.query

    if(!id)
        throw new BadRequestError('Dish ID is required to fetch details.')

    const details = await Dish.findById(id)

    res.json({
        data: details,
        message: "Request successfully done."
    })
}

module.exports = getDishDetails