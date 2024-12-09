// outinvoiceRepository.js
const sequelize = require('../configs/db');

const outinvoiceRepository = {
    getAllOutInvoices: async () => {
        const query = `SELECT * FROM ecommerce.outinvoice`;
        const [result] = await sequelize.query(query);
        return result;
    },

    getOutInvoiceById: async (id) => {
        const query = `SELECT * FROM ecommerce.outinvoice WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result[0]; // Trả về bản ghi nếu tìm thấy
    },

    createOutInvoice: async (data) => {
        const { linkPdf, order_id, customer_id } = data;
        const query = `INSERT INTO ecommerce.outinvoice (linkPdf, order_id, customer_id)
                       VALUES (:linkPdf, :order_id, :customer_id)`;
        const [result] = await sequelize.query(query, {
            replacements: { linkPdf, order_id, customer_id }
        });
        return result;
    },

    deleteOutInvoice: async (id) => {
        const query = `DELETE FROM ecommerce.outinvoice WHERE id = :id`;
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    }
};

module.exports = outinvoiceRepository;