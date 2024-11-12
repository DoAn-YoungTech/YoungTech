const sequelize = require('../configs/db');

const employeeRepository = {
    getAllEmployee: async ({ offset, limit }) => {
        const query = `SELECT * FROM employee LIMIT :limit OFFSET :offset`;
        const [result] = await sequelize.query(query, {
            replacements: { limit, offset }
        });
    
        // Lấy tổng số nhân viên để tính tổng số trang
        const totalQuery = `SELECT COUNT(*) AS totalItems FROM employee`;
        const [totalResult] = await sequelize.query(totalQuery);
        const totalItems = totalResult[0].totalItems;
    
        return {
            data: result,
            totalItems
        };
    },
    getEmployeeById: async (id) => {
        const query = `SELECT * FROM employee WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result[0];
    },
    createEmployee: async (data) => {
        console.log(`Repository ${JSON.stringify(data)}`);
        // Kiểm tra nếu flag không có trong data thì mặc định flag là false
        const { fullName, profilePicture, dateOfBirth, phoneNumber, position, account_id } = data;
        const flag = data.flag !== undefined ? data.flag : false; // Mặc định flag là false
    
        const query = `INSERT INTO employee (fullName, profilePicture, dateOfBirth, phoneNumber, position, account_id, flag)
                       VALUES (:fullName, :profilePicture, :dateOfBirth, :phoneNumber, :position, :account_id, :flag)`;
        const [result] = await sequelize.query(query, { replacements: { fullName, profilePicture, dateOfBirth, phoneNumber, position, account_id, flag } });
        return result;
    },
    deleteEmployee : async (id) => {
        const query = `UPDATE employee SET flag = true WHERE id = :id`;
        const [result] = await sequelize.query(query, {replacements : {id}});
        return result ;
    },
    restoreEmployee: async (id) => {
        const query = `UPDATE employee SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
        const [result] = await sequelize.query(query, { replacements: { id } });
        return result;
    },

    updateEmployee : async (id, data) => {
        const query = `UPDATE employee 
        SET fullName = :fullName , profilePicture = :profilePicture ,
        dateOfBirth = :dateOfBirth , phoneNumber = :phoneNumber , position = :position , account_id = :account_id 
        WHERE id = :id`
        const [result] = await sequelize.query(query, {replacements : {...data, id}});
        return result  ;
    },
       // Thêm hàm checkUserExist để kiểm tra account_id
       checkUserExist: async (account_id) => {
        const query = `SELECT 1 FROM employee WHERE account_id = :account_id LIMIT 1`;
        const [result] = await sequelize.query(query, { replacements: { account_id } });
        return result.length > 0; // Trả về true nếu tìm thấy nhân viên với account_id, false nếu không
    }
};
module.exports = employeeRepository;