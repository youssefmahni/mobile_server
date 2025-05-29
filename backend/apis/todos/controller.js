const pool = require("../../configs/database");

const get_todos = (req, res) => {
    pool.query("SELECT * FROM todo", (err, results) => {
        if (err) {
            console.error("Error fetching todos:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json( {results, success: 1});
    });
};

const edit_todo = (req, res) => {
    const { id, completed } = req.body;
    if (!id || completed === undefined) {
        return res.status(400).json({ error: "ID and completed status are required" });
    }
    const query = "UPDATE todo SET completed = ? WHERE id = ?";
    pool.query(query, [completed, id], (err, results) => {
        if (err) {
            console.error("Error updating todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo updated successfully" });
    });
}

const add_todo = (req, res) => {
    const { title, description} = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    const query = "INSERT INTO todo (title, description, completed) VALUES (?, ?, ?)";
    pool.query(query, [title, description, false], (err, results) => {
        if (err) {
            console.error("Error adding todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ id: results.insertId, title, description, completed: false });
    });
}

const delete_todo = (req, res) => {
    console.log("Delete request received:", req.body);
    
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }
    const query = "DELETE FROM todo WHERE id = ?";
    pool.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting todo:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    });
}

module.exports = {
    get_todos,
    add_todo,
    edit_todo,
    delete_todo
};