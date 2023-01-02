const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    orderByName: {
        type: String,
        required: [true,"Name required to create an order!"]
    },
    orderByMobile: {
        type: String,
        required: [true,"Phone Number required to create an order!"]
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"Phone Number required to create an order!"]
    },
    orderType:{
        type: Number,
        enum: [7,13],
        default:  7
    },
    orderStatus:{
        type: String,
        enum: ["SXS","PNDG","FLD"],
        default: "PNDG"
    },
    amount: {
        type: Number,
        required: [true,"Amount is required to create orders!"]
    },
    items: [
        {
            itemName:{
                type: String,
                required: [true,"Item name is required to create orders!"]
            },
            itemId:{
                type: mongoose.Schema.Types.ObjectId,
                required: [true,"Item name is required to create orders!"]
            },
            qty:{
                type: Number,
                required: [true,"Quantity is required to create orders!"]
            },
            perPrice:{
                type: Number,
                required: [true,"PerPrice is required to create orders!"]
            }
        }
    ],
    paymentStatus: {
        type: String,
        enum: ["SXS","PNDG","FLD"],
        default: "PNDG"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Order",Order)