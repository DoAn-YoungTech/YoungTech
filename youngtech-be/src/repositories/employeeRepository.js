


const sequelize = require('../configs/db');
const { createEmployee } = require('../services/employeeService');

const employeeRepository = {
    getAllEmployee : async () => {
        const query = `SELECT * FROM employee`;
        const [result] = await sequelize.query(query)
        return result;
        // const result = await 
    },
    createEmployee : async (data) => {
        const query =  `INSERT INTO employee (fullName , profilePicture , dateOfBirth , phoneNumber , position ,  account_id )
        VALUES (:fullName , :profilePicture , :dateOfBirth , :phoneNumber , :position ,  :account_id)`
        const [result] = sequelize.query(query ,{ replacements: data } );
        return result ;
    }
}