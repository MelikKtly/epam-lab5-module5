"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files from public directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
// Mount auth routes
app.use('/api/v1/auth', auth_controller_1.default);
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Serve index.html for root
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend available at http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map