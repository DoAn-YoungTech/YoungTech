
const inputInvoiceService = require('../services/inputInvoiceService');

const inputInvoiceController = {
  addProductToInventory: async (req, res) => {
    const products = req.body; 

    try {
      const result = await inputInvoiceService.addProductToInventory(products);

      return res.status(200).json({
        message: 'Products and images processed successfully',
        data: result, 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },

  saveInputInvoice: async (req, res) => {
    const { totalAmount, linkPdf, employee_id } = req.body; 

    if (!linkPdf) {
      return res.status(400).json({
        message: 'linkPdf is required'
      });
    }

    const currentDate = new Date();
    const formattedInvoiceDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    try {
      const invoiceData = {
        invoiceDate: formattedInvoiceDate,  
        totalAmount,        
        employee_id,
        linkPdf        
      };

      const savedInvoice = await inputInvoiceService.saveInputInvoice(invoiceData);

      return res.status(200).json({
        message: 'Input Invoice saved successfully',
        data: savedInvoice
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      });
    }
  }
};

module.exports = inputInvoiceController;
