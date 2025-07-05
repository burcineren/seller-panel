const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(jsonServer.bodyParser);
app.use(middlewares);

// Login endpoint
app.post("/users/login", (req, res) => {
  try {
    console.log("POST /users/login body:", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username ve password gerekli" });
    }
    const user = router.db
      .get("users")
      .find({ username: username, password: password })
      .value();
    if (user) {
      const { password: pw, ...userWithoutPassword } = user;
      console.log("Login başarılı kullanıcı:", userWithoutPassword);
      return res.json(userWithoutPassword);
    } else {
      console.log("Login başarısız, eşleşme yok");
      return res.status(401).json({ message: "Username veya şifre yanlış" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/users/logout", (req, res) => {
  console.log("POST /users/logout çağrıldı");
  return res.json({ message: "Çıkış işlemi başarılı" });
});

app.post("/orders", (req, res) => {
  try {
    const order = req.body;
    console.log("POST /orders/approve body:", order);

    if (!order || !order.productId || !order.customerName) {
      return res.status(400).json({ message: "Sipariş bilgileri eksik" });
    }
    const newOrder = router.db.get("orders").insert(order).write();
    console.log("Yeni sipariş kaydedildi:", newOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Sipariş kaydında hata:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
app.use(router);

app.listen(3000, () => {
  console.log("Sunucu port 3000’da çalışıyor");
});
