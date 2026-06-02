const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware'); // 👈 Importação direta e limpa

// Aplica o middleware e depois chama o controller
router.get('/', authMiddleware, dashboardController.getDashboardMetrics);

module.exports = router;