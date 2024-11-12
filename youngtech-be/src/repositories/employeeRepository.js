
const sequelize = require('../configs/db');
const dayjs = require('dayjs');
const employeeRepository = {
  // create employee
  createEmployee: async (data, userId) => {
    const originalDateOfBirth = data.dateOfBirth;
    // Đảm bảo định dạng ngày thành 'YYYY-MM-DD' và không thêm múi giờ . DD-MM-YYYY
    const formatDay = dayjs(originalDateOfBirth, 'DD-MM-YYYY').format(
      'YYYY-MM-DD'
    );
    const query = `INSERT INTO employee (fullName , profilePicture , dateOfBirth , phoneNumber , position ,  account_id )
        VALUES (:fullName , :profilePicture , :dateOfBirth , :phoneNumber , :position , :account_id)`;

    const [result] = await sequelize.query(query, {
      replacements: {
        ...data,
        dateOfBirth: formatDay,
        account_id: userId,
      },
    });
    return result;
  },

  //checkUserExist
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM employee WHERE account_id =:account_id `;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result;
  },

  // list employee

  viewingListEmployee: async () => {
    const query = `SELECT * FROM employee`;
    const [result] = await sequelize.query(query);
    return result;
  },

  // updateInformationEmployee

  updateInformationEmployee: async (data, accountId) => {
    const originalDateOfBirth = data.dateOfBirth;
    // Đảm bảo định dạng ngày thành 'YYYY-MM-DD' và không thêm múi giờ . DD-MM-YYYY
    const formatDay = dayjs(originalDateOfBirth, 'DD-MM-YYYY').format(
      'YYYY-MM-DD'
    );
    const query = `UPDATE employee SET fullName=:fullName , profilePicture=:profilePicture , dateOfBirth=:dateOfBirth , phoneNumber=:phoneNumber , position=:position WHERE account_id =:account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...data, dateOfBirth: formatDay, account_id: accountId },
    });
    return result;
  },

  // viewOnlyEmployee

  viewOnlyEmployee: async (id) => {
    const query = `SELECT * FROM employee WHERE id=:id`;
    const [result] = await sequelize.query(query, { replacements: { id: id } });
    return result[0];
  },

  // deleteEmployeeById(id)
  deleteEmployeeById: async (id) => {
    const query = `DELETE  FROM employee WHERE id=:id`;
    const [result] = await sequelize.query(query, { replacements: { id: id } });
    return result.affectedRows > 0;
  },
};

module.exports = employeeRepository;

