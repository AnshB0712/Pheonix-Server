const { channels, ordersQName } = require("../../config/connectToQueue")
const Order = require("../../models/Order");
const { orderConsumer } = require("./getAllTodaysOrdersViaSocket");

const changeOrderStatus = async (req, res) => {
  try {
    // Extract the message id and new order status from the request body
    const { id, orderStatus,deliveryTag } = req.body;
    await Order.findByIdAndUpdate(id,{orderStatus})
    channels.ordersChannel.ack({fields: { ...orderConsumer,deliveryTag }});
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while updating the order status',
    });
  }
};

module.exports = changeOrderStatus