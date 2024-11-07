const jwt = require("jsonwebtoken")

const middlewareController = {
  verifyToken: (req, res, next) => {
    const tokenBear = req.header("Authorization")?.replace("Bearer ", "") 

    const token = req.headers.token


    if (tokenBear || token) {
      const accessToken = tokenBear ? tokenBear : token.split(" ")[1]
      jwt.verify(accessToken, process.env.accessSecretKey, (err, user) => {
        if (err) {
          res.status(403).json({ message: "Token not valid" })
        } else {
          req.user = user
          next()
        }
      })
    } else {
      res.status(401).json(`You're not authentication`)
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id) {
        next()
      } else {
        res
          .status(403)
          .json({ message: `You're not allowed to delete other ` })
      }
    })
  },

  verifyTokenAndRole: (roles) => {
    return (req, res, next) => {
      middlewareController.verifyToken(req, res, () => {
        if (roles.some((role) => req.user.roles.includes(role))) {
          next()
        } else {
          res
            .status(403)
            .json("You do not have permission to access this resource")
        }
      })
    }
  }
}

module.exports = middlewareController
