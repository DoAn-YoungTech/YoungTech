const supplierService = require("../services/supplierService");

const supplierController = {
  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await supplierService.getAllSuppliers();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createSupplier: async (req, res) => {
    try {
      const supplierData = req.body;
      const newSupplier = await supplierService.createSupplier(supplierData);
      res.status(201).json(newSupplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSupplier: async (req, res) => {
    try {
      const id = req.params.id;
      const supplierData = req.body;
      const updatedSupplier = await supplierService.updateSupplier(
        id,
        supplierData
      );
      res.status(200).json(updatedSupplier);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSupplier: async (req, res) => {
    try {
      const id = req.params.id;
      await supplierService.deleteSupplier(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSupplierById: async (req, res) => {
    try {
      const id = req.params.id;
      const supplier = await supplierService.getSupplierById(id);
      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
      } else {
        res.status(200).json(supplier);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = supplierController;
