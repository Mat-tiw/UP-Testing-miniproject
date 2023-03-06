import Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testingdb",
})
app.use(Express.json());
app.use(cors())
app.get('/event', (req, res) => {
  db.query("SELECT * FROM testingdb.event", (err, result) => {
    if (err) { res.status(404).send('Error in backend') }
    else {
      res.json(result)
    }
  })
})
app.post('/events', async (req, res) => {

  if (!req.body.date) {
    return res.status(500).json({
      message: "Missing date parameter",
    });
  }
  if (!req.body.title) {
    return res.status(500).json({
      message: "Missing title parameter",
    });
  }

  const values = [
    req.body.title,
    req.body.date,
  ];
  db.query("SELECT * FROM testingdb.event WHERE date = ?", [values[1]], (err, result) => {
    if (result[0] == null) { res.status(404).send('Error in backend') }
    else {
      res.json(result)
    }
  })
})
app.post("/eventss", (req, res) => {
    
  if (!req.body.date) {
    return res.status(500).json({
      message: "Missing date parameter",
    });
  }
  if (!req.body.title) {
    return res.status(500).json({
      message: "Missing title parameter",
    });
  }

  const sql = "INSERT INTO event(`title`, `date`) VALUES (?,?)";
  const values = [
    req.body.title,
    req.body.date,
  ];
  console.log(values)
  db.query(sql, values, (err, data) => {

    if (err) return res.send(err);
    return res.json("register  success");
  }
  )
})
app.post('/events/rev', (req, res) => {
  if (!req.body.title) {
    return res.status(500).json({
      message: "Missing title parameter",
    });
  }
  const sql = "DELETE FROM event WHERE title = ?"
  db.query(sql, req.body.title, (err, result) => {
    if (err) {
      return res.status(404).json({
        message: err.message,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    return res.json("Event is deleted");
  });
});
app.post('/events/update', (req, res) => {

  if (!req.body.date) {
    return res.status(500).json({
      message: "Missing date parameter",
    });
  }
  if (!req.body.title) {
    return res.status(500).json({
      message: "Missing title parameter",
    });
  }

  const sql = "UPDATE event SET title = ? WHERE date = ?";
  const values = [
    req.body.title,
    req.body.date,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    return res.json("Event is updated");
  });
});

app.listen(8800, () => {
  console.log('backend listening to port 8800')
})
export default app