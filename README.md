# 🤖 Chatbot Project

Một ứng dụng chatbot thông minh được xây dựng với React frontend và Node.js backend, sử dụng PostgreSQL database và Groq AI API.

## 📋 Mục lục
- [🚀 Cài đặt nhanh](#-cài-đặt-nhanh)
- [🔑 Cấu hình API Key](#-cấu-hình-api-key)
- [🐳 Chạy với Docker](#-chạy-với-docker)
- [🗄️ Quản lý Database](#️-quản-lý-database)
- [💻 Chạy Frontend](#-chạy-frontend)
- [📊 Cấu trúc Database](#-cấu-trúc-database)

## 🚀 Cài đặt nhanh

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- Docker & Docker Compose
- npm hoặc yarn

## 🔑 Cấu hình API Key

### 1. Tạo Groq API Key
1. 🌐 Truy cập: [Groq Console](https://console.groq.com/home)
2. 👤 Tạo tài khoản Groq (nếu chưa có)
3. 🔐 Tạo **API Key** cho dự án của bạn

### 2. Cấu hình môi trường
```bash
# Sao chép file cấu hình mẫu
cp .env.example .env
```

Mở file `.env` và thêm API Key:
```env
GROQ_API_KEY=your_api_key_here
```

## 🐳 Chạy với Docker

```bash
# Khởi động tất cả services
docker compose up -d
```

> 💡 **Tip**: Sử dụng flag `-d` để chạy ngầm

## 🗄️ Quản lý Database

### Truy cập pgAdmin
🌐 **URL**: http://localhost:5050

**Thông tin đăng nhập:**
```
📧 Email: admin@chatbot.com
🔑 Password: admin123
```

### Thêm Database Server

1. **Tạo Server mới:**
   - Click `Create` → `Server`

2. **Tab "General":**
   ```
   📝 Name: Chatbot DB
   ```

3. **Tab "Connection":**
   ```
   🏠 Host: postgres
   👤 Username: chatbot_user
   🔑 Password: chatbot_pass
   🗄️ Database: chatbot_db
   ```

4. Click **Save** để kết nối

## 💻 Chạy Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Khởi động development server
npm start
```

🌐 **Frontend sẽ chạy tại**: http://localhost:3000

## 📊 Cấu trúc Database

### Tạo các bảng cần thiết

```sql
-- Bảng sinh viên
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    anonymous_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng tin nhắn
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    sender VARCHAR(20) CHECK (sender IN ('student', 'bot')),
    content TEXT NOT NULL,
    emotion JSONB,
    risk_level INT DEFAULT 0 CHECK (risk_level >= 0 AND risk_level <= 10),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng cảnh báo
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    message_id INT REFERENCES messages(id),
    risk_level INT CHECK (risk_level >= 0 AND risk_level <= 10),
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Thêm dữ liệu mẫu
INSERT INTO students (anonymous_id) VALUES ('abc123');
```

## 🛠️ Các lệnh hữu ích

```bash
# Xem logs của tất cả containers
docker compose logs

# Dừng tất cả services
docker compose down

# Rebuild và restart
docker compose up --build

# Xóa tất cả data (cẩn thận!)
docker compose down -v
```

## 📁 Cấu trúc dự án

```
chatbot/
├── 🐳 docker-compose.yml     # Docker configuration
├── 📚 README.md              # Tài liệu này
├── 🔙 backend/               # Node.js backend
│   ├── 📦 package.json
│   ├── 🚀 server.js
│   ├── 🗄️ db.js
│   └── 📡 routes/
├── 🗃️ db/                    # Database files
└── 🎨 frontend/              # React frontend
    ├── 📦 package.json
    ├── 📁 public/
    └── 📁 src/
```

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.


