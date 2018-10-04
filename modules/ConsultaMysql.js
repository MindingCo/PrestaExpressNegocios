const controlador = {};

controlador.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM ', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controlador.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controlador.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controlador.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controlador.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controlador;

function connect(pass, db)
{
    con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: pass,
        database: db
    })
    con.connect(function(err)
    {
        if (err) throw err
        console.log("Conexion con base completada")
    });
}

function login(req, contraseña)
{
    var Sesion
    var sql = 'SELECT nom_usu, con_usu, id_tus FROM usuario WHERE nom_usu = ? AND con_usu = ?';
    con.query(sql, [nombre, contraseña], (err, result) =>
    {
        if (err) console.log(err)
        else
        {
            var Sesion =
            {
                Nombre: result[0].nom_usu,
                Contraseña: result[0].con_usu,
                Tipo: result[0].id_tus
            }
            console.log(Sesion)
            return Sesion
        }
    })
}

exports.connect = connect
exports.login = login
