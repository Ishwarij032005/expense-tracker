const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors'); // optional dev convenience
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors({
  origin: [
    "https://expense-tracker-git-main-ishwari-jamadades-projects.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(express.json());

// routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use('/api/recurring', require('./routes/recurring'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/budgets', require('./routes/budget'));
app.use('/api/wallets', require('./routes/wallet'));
app.use("/api/insights", require("./routes/insights"));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./routes/upload"));


// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
