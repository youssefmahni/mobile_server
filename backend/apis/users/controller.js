const {
  register_user_by_email,
  get_user_by_email,
  login_by_intra
} = require("./services");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: 0,
      message: "email and password are required",
    });
  }
  const body = req.body;
  get_user_by_email(body.email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "database connection error",
      });
    }
    if (!results) {
      return res.status(200).json({
        success: 0,
        message: "invalid email",
      });
    }
    const ok = compareSync(body.password, results.password);
    if (ok) {
      const jwt = sign({ email: results.email, id: results.id, role: results.role }, "udhjsdbhbdhsb376376673vgavD@#$%^&Vvfvr2#$%6GBXW#Wfcfcfswc", {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .cookie("token", jwt, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .json({
          success: 1,
          message: "login successfully",
        });
    } else {
      return res.status(200).json({
        success: 0,
        message: "invalid password",
      });
    }
  });
};

const logout = (req, res) => {
  res.status(200).clearCookie("token", {
    sameSite: "None",
    path: "/",
    httpOnly: true,
    secure: true,
  }).json({
    success: 1,
    message: "user is out & cookie is clear",
  });
};

const register = (req, res) => {
  if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
    return res.status(400).json({
      success: 0,
      message: "first name, last name, email and password are required",
    });
  }
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  get_user_by_email(body.email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "database connection error",
      });
    }
    if (results) {
      return res.status(200).json({
        success: 0,
        message: "Email already exists",
      });
    }
    register_user_by_email(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          success: 0,
          message: "database connection error",
        });
      }
      const jwt = sign({ email: results.email, id: results.id, role: results.role }, "udhjsdbhbdhsb376376673vgavD@#$%^&Vvfvr2#$%6GBXW#Wfcfcfswc", {
        expiresIn: "1h",
      });
      return res.status(200)
        .cookie("token", jwt, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .json({
          success: 1,
          message: "User registered successfully",
        });
    });
  }
  );
}


const intra = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }
  login_by_intra(code, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message || "database connection error",
      });
    }
    if (results) {
      const jwt = sign({ email: results.email, id: results.login, role: results.role }, "udhjsdbhbdhsb376376673vgavD@#$%^&Vvfvr2#$%6GBXW#Wfcfcfswc", {
        expiresIn: "1h",
      });
      return res.status(200)
        .cookie("token", jwt, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
        })
        .redirect('http://localhost:8081/');
    } else {
      return res.status(200).json({
        success: 0,
        message: "User not found",
      });
    }
  }
  );
};




module.exports = {
  login,
  register,
  intra,
  logout
};