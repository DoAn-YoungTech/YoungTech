// outinvoiceService.js
const outinvoiceRepository = require('../repositories/outinvoiceRepository');

const outinvoiceService = {
    getAllOutInvoices: async () => {
        return await outinvoiceRepository.getAllOutInvoices();
    },

    getOutInvoiceById: async (id) => {
        return await outinvoiceRepository.getOutInvoiceById(id);
    },

    createOutInvoice: async (invoiceData) => {
        return await outinvoiceRepository.createOutInvoice(invoiceData);
    },

    deleteOutInvoice: async (id) => {
        return await outinvoiceRepository.deleteOutInvoice(id);
    }
};

module.exports = outinvoiceService;
