const sequelize = require("../configs/db");

const orderDetailRepositori ={
    getAllOrderDetail: async ()=>{
        const query = `SELECT * FROM orderdetail`;
        const [result] = await sequelize.query(query);
        return result;
    },
    getOrderDetailById: async (id) => {
        const query = `SELECT * FROM orderdetail WHERE id = :id`;
        const [result] = await sequelize.query(query,{replacements: {id}});
        return result[0];
    },
    createOrderDetail: async (data) =>{
        console.log(data);
        const query = `INSERT INTO orderdetail (unitPrice, description, quantity, order_id, product_id)
                       VALUES (:unitPrice, :description, :quantity, :order_id, :product_id)`
        const [result] = await sequelize.query(query, {replacements: data});
        return result;
    },
    deleteOrderDetail: async (id, data) => {
        const query = `UPDATE orderdetail SET is_deleted = true WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements:{...data,id}});
        return result;
    },
    updateOrderDetail: async (id, data) => {
        const query = `UPDATE orderdetail 
                       SET unitPrice = :unitPrice, description = :description, quantity = :quantity order_id = :order_id, product_id = :product_id
                       WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements:{...data,id}});
        return result;
    },
};

module.exports = orderDetailRepositori;