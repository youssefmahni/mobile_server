const { verify } = require("jsonwebtoken");

const check_token = (req, res, next) => {
  const token = req?.cookies?.token;
  if (token) {
    verify(token, "udhjsdbhbdhsb376376673vgavD@#$%^&Vvfvr2#$%6GBXW#Wfcfcfswc", (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: "Session expired! Please refresh the page.",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Session expired! Please refresh the page.",
    });
  }
};

const check_token_role = (req, res, next) => {
  const token = req?.cookies?.token;
  if (token) {
    verify(token, "udhjsdbhbdhsb376376673vgavD@#$%^&Vvfvr2#$%6GBXW#Wfcfcfswc", (err, decoded) => {
      if (err) {
        res.json({
          success: 0,
          message: "Session expired! Please refresh the page.",
        });
      } else {
        if (decoded.result.role !== "staff") {
          res.json({
            success: 0,
            message: "Access denied! You are not authorized to access this resource.",
          });
        } else
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Session expired! Please refresh the page.",
    });
  }
};

module.exports = {
  check_token,
  check_token_role,
};
