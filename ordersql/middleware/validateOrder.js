exports.validateOrder = (req, res, next) => {

    const { custname, items } = req.body;

    if (!custname || !items || items.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
    }

    for (let item of items) {
        if (!item.product_id || !item.quantity || item.quantity <= 0) {
            return res.status(400).json({ message: "Invalid product details" });
        }
    }

    next();
};
