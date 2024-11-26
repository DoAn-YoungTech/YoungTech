const sequelize = require('../configs/db');  

const inputInvoiceRepository = {
  saveInputInvoice: async (invoiceData) => {
    try {
      const query = `
        INSERT INTO InputInvoice (invoiceDate, totalAmount, employee_id, linkPdf)
        VALUES (:invoiceDate, :totalAmount, :employee_id, :linkPdf)
      `;
      
      const [result] = await sequelize.query(query, {
        replacements: {
          invoiceDate: invoiceData.invoiceDate,
          totalAmount: invoiceData.totalAmount,
          employee_id: invoiceData.employee_id,
          linkPdf: invoiceData.linkPdf
        }
      });

      return result;
    } catch (error) {
      console.error('Error saving input invoice:', error);
      throw new Error('Error saving input invoice: ' + error.message);
    }
  }
};

module.exports = inputInvoiceRepository;
