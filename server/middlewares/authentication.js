const jwt = require(`jsonwebtoken`);
// =========== Verify Token

let verifyToken = (req, res, next) => {
    let authorization = req.get("Authorization");


    jwt.verify(authorization, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                OK: false,
                err: {
                    message: `Invalid Token`
                }
            });
        } else {
            req.user = decoded.user;
            next();
        }
    });
};

let verifyAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            OK: false,
            message: `This user doesn't have permissions`
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdminRole
};
