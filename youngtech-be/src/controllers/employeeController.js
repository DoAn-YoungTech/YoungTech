
const employeeService = require('../services/employeeService')
const employeeController = {  
getAllEmployee : (req, res) => { 
    res.json("Get all  employee")
},
getAllEmployee : (req, res) => { 
    res.json("create  employee")
} ,
updateEmployee : (req, res) => { 
    const id = req.params.id
    res.json(`Update  employee ${id}`)
} ,
deleteEmployee : (req, res) => { 
    const id = req.params.id
    res.json(`Delete  employee ${id}`)
} ,
getEmployeeById : (req, res) => { 
    const id = req.params.id
    res.json(`Get  employee ${id}`)
} ,
createEmployee :async (req , res) => {
    try {
        const data = req.body;
        console.log(data);
        // const result = await employeeService.createEmployee(data)


    }catch(err) {

    }
     
} 
}


module.exports = employeeController;