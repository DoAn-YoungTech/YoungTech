const sequelize = require('../configs/db');

const employeeRepository = {
    getAllEmployee : async () => {
        const query = `SELECT * FROM employee`;
        const [result] = await sequelize.query(query)
        return result;
    },
    getEmployeeById: async (id) => {
        const query = `SELECT * FROM employee WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result[0];
    },
    createEmployee : async (data) => {
        console.log(`Repository ${data}`);
        const query =  `INSERT INTO employee (fullName , profilePicture , dateOfBirth , phoneNumber , position ,  account_id )
        VALUES (:fullName , :profilePicture , :dateOfBirth , :phoneNumber , :position ,  :account_id)`
        const [result] = await sequelize.query(query ,{ replacements: data } );
        return result ;
    },
    deleteEmployee : async (id) => {
        const query = `UPDATE employee SET is_deleted = true WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result ;
    },
    updateEmployee : async (id, data) => {
        const query = `UPDATE employee 
        SET fullName = :fullName , profilePicture = :profilePicture , 
        dateOfBirth = :dateOfBirth , phoneNumber = :phoneNumber , position = :position , account_id = :account_id 
        WHERE id = :id`
        const [result] = await sequelize.query(query, {replacements : {...data, id}});
        return result  ;
    },
};
module.exports = employeeRepository;