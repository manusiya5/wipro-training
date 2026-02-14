const pool = require("../db/connection");

exports.placeOrder = async (req, res) => {

    const connection = await pool.getConnection();

    try {

        const { custname, items } = req.body;

        await connection.beginTransaction();

        let totalAmount = 0;

        for (let item of items) {

            //  stock check
            const [rows] = await connection.query(
                "SELECT * FROM products WHERE id = ? FOR UPDATE",
                [item.product_id]
            );

            if (rows.length === 0) {
                throw new Error("Product not found");
            }

            const product = rows[0];

            if (product.stock < item.quantity) {
                throw new Error("Insufficient stock");
            }

            totalAmount += product.price * item.quantity;

         // Reduce stock
            await connection.query(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [item.quantity, item.product_id]
            );
        }
         //order
        const [orderResult] = await connection.query(
            "INSERT INTO orders (custname, totalamount) VALUES (?, ?)",
            [custname, totalAmount]
        );

        const orderId = orderResult.insertId;

        for (let item of items) {
            await connection.query(
                "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
                [orderId, item.product_id, item.quantity]
            );
        }

        await connection.commit();

        res.status(201).json({
            message: "Order placed successfully",
            orderId,
            totalAmount
        });

    } catch (error) {

        await connection.rollback();
        res.status(400).json({ message: error.message });

    } finally {

        connection.release();
    }
};
