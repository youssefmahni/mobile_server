const pool = require("../../configs/database");
const axios = require('axios');

const get_user_by_email = (email, callback) => {
    pool.query(
        `SELECT * FROM users WHERE email= ?`,
        [email],
        (error, result) => {
            if (error) callback(error);
            callback(null, result[0]);
        }
    );
};


const register_user_by_email = (data, callback) => {
    pool.query(
        `insert into users(fname, lname, email, password, role)
              values(?,?,?,?,?)`,
        [data.fname, data.lname, data.email, data.password, "unknown"],
        (error, result) => {
            if (error) return callback(error);
            return callback(null, result);
        }
    );
};


const login_by_intra = async (code, callback) => {
    try {
        const response = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: "u-s4t2ud-5959b23c7b7a4e0e6c8cf699d720c52204fda3cb972edb23981ed782a58670e0",
            client_secret: "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",
            code: code,
            redirect_uri: "http://localhost:3000/user/intra"
        });

        const { access_token } = response.data;

        const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const login = userResponse.data.login;
        const avatar = userResponse.data.image.link;
        const email = userResponse.data.email;
        const role = userResponse["staff?"] ? "staff" : "student";
        const fname = userResponse.data.first_name;
        const lname = userResponse.data.last_name;
        pool.query(
            `SELECT * FROM users WHERE email= ?`,
            [email],
            (error, result) => {
                if (error) callback(error);
                if (result.length == 0) {
                    pool.query(
                        `insert into users(login, fname, lname, email, avatar, role)
                         values(?,?,?,?,?,?)`,
                        [login, fname, lname, email, avatar, role],
                        (error, result) => {
                            if (error) return callback(error);
                        }
                    );
                }
            }
        );
        const userData = {
            email: email,
            role: role,
            login: login,
        };
        return callback(null, userData);

    } catch (error) {
        return callback(error);
    }
}






module.exports = {
    get_user_by_email,
    register_user_by_email,
    login_by_intra
};