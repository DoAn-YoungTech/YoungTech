const supplierRepository = require("../repositories/supplierRepository");

const supplierService = {

    getAllSuppliers: async () => {
        return await supplierRepository.getAllSuppliers();
    },

    createSupplier: async (supplierData) => {
        return await supplierRepository.createSupplier(supplierData);
    },

    updateSupplier: async (id, supplierData) => {
        return await supplierRepository.updateSupplier(id, supplierData);
    },

    deleteSupplier: async (id) => {
        return await supplierRepository.deleteSupplier(id);
    },

    getSupplierById: async (id) => {
        return await supplierRepository.getSupplierById(id);
    },
};

module.exports = supplierService;
