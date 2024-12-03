const bcrypt = require('bcrypt');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      console.log(userName,email,password)
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // check email
      const checkEmail = await authService.findUserByEmail(email);
      if (checkEmail) {
        return res
          .status(403)
          .json({ message: `Email exist ! Please create new email !` });
      }
      const account = await authService.register(userName, email, hashPassword);
      //id
      console.log(account);
      if (!account) {
        return res.status(404).json({ message: 'Registration failed' });
      }

      //add user id to role account
      const defaultRoleId = 1;
      const roleIds = req.body.roleIds || [defaultRoleId];
      await authService.assignRolesToAccount(roleIds, account);

      // add user to customer
      const addUserCustomer = await authService.userIdCustomer(account);

      console.log(addUserCustomer);
      if (!addUserCustomer) {
        return res
          .status(403)
          .json({ message: 'Can not add account_id in customer ' });
      }
      return res.status(201).json({ message: 'Register success !' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },

  //generateAccessToken
  generateAccessToken: (user, getRoleName) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email, role: getRoleName },
      // secret key
      process.env.accessSecretKey,
      // option
      { expiresIn: '30d' }
    );
  },

  refreshToken: (user) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email },
      // secret key
      process.env.refreshToken,
      // option
      { expiresIn: '365d' }
    );
  },

    login: async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log(email, password )
        // find userName follow email
        const user = await authService.findUserByEmail(email);
        console.log(user);
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Email use not exit , Please try again !' });
        }

        // get role_id by account_id
        const getRoleId = await authService.getRoleId(user.id);
        console.log('Role id ', getRoleId);

        if (!getRoleId) {
          return res
            .status(403)
            .json({ message: 'Account id not exist in role account' });
        }

        // get role name by role_id
        const getRoleName = await authService.getRoleName(getRoleId);
        if (!getRoleName) {
          return res.status(404).json({ message: 'Role name not found' });
        }
        console.log('role name', getRoleName);
        // if true save role in payload token account
        // then => compare pass login === pass on database ,use bcrypt
        const comparePass = await bcrypt.compare(password, user.password);
        console.log(comparePass)

        if (!comparePass) {
          return res.status(404).json({ message: 'Password wrong!' });
        }
 
        if (user && comparePass) {
          const accessToken = authController.generateAccessToken(
            user,
            getRoleName
          );
          console.log(accessToken)
          const refreshToken = authController.refreshToken(user);
          console.log(refreshToken)

          // save refresh token in data
          const saveRefreshToken = await authService.saveRefreshToken(
            user.id,
            refreshToken
          );

          if (!saveRefreshToken) {
            return res
              .status(403)
              .json({ message: 'Error saving refresh token' });
          }

          const { password, ...others } = user;
          res.status(200).json({ ...others, accessToken, refreshToken });
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    },

  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'You are not authentication' });
    }

    const checkRefreshTokenExist = await authService.checkRefreshTokenExist(
      refreshToken
    );

    if (!checkRefreshTokenExist) {
      return res
        .status(403)
        .json({ message: 'Refresh token not exist in data' });
    }

    if (new Date() > new Date(checkRefreshTokenExist.expires_at)) {
      return res
        .status(403)
        .json({ message: 'Refresh token has expires ! Please Logout ' });
    }
    // check refresh token match jwt and check refresh  token is exist in data

    jwt.verify(refreshToken, process.env.refreshToken, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid Refresh token' });
      }

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.refreshToken(user);

      try {
        await authService.deleteRefreshTokenOld(refreshToken);

        await authService.saveNewRefreshToken(user.id, newRefreshToken);

        return res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (error) {
        console.error('Error refreshing token:', error);
        res
          .status(500)
          .json({ message: 'Token refresh failed. Please try again later.' });
      }
    });

    // refresh exist in data

    //
  },

  userLogout: async (req, res) => {
    const { refreshToken } = req.body;

    console.log(`refreshToken ${refreshToken}`);

    if (!refreshToken) {
      return res.status(401).json({ message: 'You are not authentication' });
    }

    // check refresh token exist or not

    const checkRefreshToken = await authService.checkRefreshToken(refreshToken);

    if (!checkRefreshToken) {
      return res
        .status(403)
        .json({ message: 'refresh token not found . Please login again !' });
    }

    // if refresh token exist in data delete it
    const deleteRefreshToken = await authService.deleteRefreshTokenLogout(
      refreshToken
    );

    if (deleteRefreshToken) {
      return res.status(200).json({ message: 'Logged out success!' });
    } else {
      return res.status(500).json({ message: `Login Failed` });
    }
  },
};

module.exports = authController;

// STORE TOKEN
//1 . LOCAL STORAGE
//agin SXX
//2 . COOKIES
//AGIN => CSRF =/ SAMESITE
//3 . REDUX STORE --> ACCESSTOKEN
// HTTPONLY COOKIES --> REFRESHTOKEN

// alternative text
