const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        if (!req.headers.authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }

        const token = req.headers.authorization.split(" ")[1];

        const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(tokenPayload.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("AUTH ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authenticate;
