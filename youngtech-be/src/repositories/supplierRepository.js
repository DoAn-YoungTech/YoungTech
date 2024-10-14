const sequelize = require("../configs/db");
const supplierRepository = {
  getAllSuppliers: async () => {
    const query = `SELECT * FROM supplier`;
    const [results] = await sequelize.query(query);
    return results;
  },
  createSupplier: async (supplierData) => {
    const query = `INSERT INTO supplier (supplierName, contactName, phoneNumber, email, address) 
                   VALUES (:supplierName, :contactName, :phoneNumber, :email, :address)`;
    const [result] = await sequelize.query(query, {
      replacements: supplierData,
    });
    return result;
  },

  updateSupplier: async (id, supplierData) => {
    const query = `UPDATE supplier SET supplierName = :supplierName, contactName = :contactName, 
                   phoneNumber = :phoneNumber, email = :email, address = :address WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...supplierData, id },
    });
    return result;
  },

  deleteSupplier: async (id) => {
    const query = `DELETE FROM supplier WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  getSupplierById: async (id) => {
    const query = `SELECT * FROM supplier WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },
};

module.exports = supplierRepository;
