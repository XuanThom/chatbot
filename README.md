# Tạo chatbot api key

Link: https://console.groq.com/home
Tạo tài khoản và api_key

# build docker 

```
docker compose up -d
```

# Truy cập Database

truy cập http://localhost:5050

```
Email: admin@chatbot.com
Password: admin123
```

# Add server:

```
Trong pgAdmin:

Create → Server

Tab "General": đặt tên "Chatbot DB"

Tab "Connection":

Host: postgres

Username: chatbot_user

Password: chatbot_pass

Database: chatbot_db

OK → bạn truy cập được DB rồi.
```

Tạo bảng

```
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    anonymous_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    sender VARCHAR(20),  -- 'student' | 'bot'
    content TEXT,
    emotion JSONB,
    risk_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    message_id INT REFERENCES messages(id),
    risk_level INT,
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO students (anonymous_id) VALUES ('abc123');
```

# Chạy giao diện 

```
cd frontend
npm install
npm start
```
