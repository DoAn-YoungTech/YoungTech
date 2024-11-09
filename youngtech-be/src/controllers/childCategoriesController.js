const childCategoriesService = require("../services/childCategoriesService");

const childCategoriesController = {
    getAllChildCategories: async (req, res) => {
        try {
            const result = await childCategoriesService.getAllChildCategories();
            res.json({message: "All Chiid Categories", data: result});
        }catch(err){
            res.status(500).json({message: "Internal server error", error: err.message});    
        }
    },

    getChildCategoriesById: async (req, res) => {
        try{
            const id = req.params.id;
            const result = await childCategoriesService.getChildCategoriesById(id);
            if(!result){
                res.status(404).json({message: " Child categories by id not found"});
            }else{
                res.status(200).json({message: "Success", data: result});
            }
        }catch(err){
            res.status(500).json({message: "Internal server error", error: err.message});
        }
    },
    updateChildCategories: async (req, res) =>{
        try{
            const id = req.params.id;
            const data = req.body;
            const result = await childCategoriesService.updateChildCategories(id, data);
            if(!result){
                res.status(404).json({message:"Child categories not found for update"});
            }else{
                res.status(200).json({message: "Updated successfully", data: result});
            }
        }catch(err){
            res.status(500).json({message: "Internal server error", error: err.message});
        }
    }, 
    createChildCategories: async (req, res) => {
        try {
            const data = req.body;
            const result = await childCategoriesService.createChildCategories(data);
            if(!result){
                res.status(404).json({message: "Create child categories failes!"});
            }else{
                res.status(200).json({message: "Child categories created successfully", data: result});
            }
        }catch(err){
            res.status(500).json({message: "Internal server error", error: err.message});
        }
    },

    deleteChildCategories: async (req,res) =>{
        try{
            const id = req.params.id;
            const result = await childCategoriesService.deleteChildCategories(id, {flag: true});
            if (!result) {
                res.status(404).json({message: "Child categories not found"});
            }else{
                res.status(200).json({message: "Child categories soft deleted successfully"});
            }
        }catch(err){
            res.status(500).json({message: "Internal Server Error", error: err.message});
        }
    },

    restoreChildCategories: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await childCategoriesService.restoreChildCategories(id, {flag: false});
            if (!result) {
                res.status(404).json({message: "Child categories not found"});
            } else{
                res.status(200).json({message: "Child categories restored successfully!"});
            }
        } catch (err) {
            res.status(500).json({message: "Internal Server Error", error: err.message});
        }
    },

};
 module.exports = childCategoriesController;