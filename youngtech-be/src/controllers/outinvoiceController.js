// outinvoiceController.js
const outinvoiceService = require('../services/outinvoiceService');

const outinvoiceController = {
    getAllOutInvoices: async (req, res) => {
        try {
            const invoices = await outinvoiceService.getAllOutInvoices();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving invoices', error });
        }
    },

    getOutInvoiceById: async (req, res) => {
        try {
            const { id } = req.params;
            const invoice = await outinvoiceService.getOutInvoiceById(id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving invoice', error });
        }
    },

    createOutInvoice: async (req, res) => {
        try {
            const newInvoice = await outinvoiceService.createOutInvoice(req.body);
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ message: 'Error creating invoice', error });
        }
    },

    deleteOutInvoice: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await outinvoiceService.deleteOutInvoice(id);
            if (!result) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json({ message: 'Invoice deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting invoice', error });
        }
    }
};

module.exports = outinvoiceController;
