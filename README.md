# FoodSync 🍱  
## AI-Powered Food Waste Prediction & Redistribution Platform

FoodSync is an intelligent web platform designed to minimize food wastage by predicting surplus food generation and enabling efficient redistribution to NGOs and shelters in real time.

The system connects restaurants, hostels, event organizers, supermarkets, and food donors with nearby NGOs through a centralized platform powered by machine learning and smart logistics.

---

# 🚀 Features

- 🔍 AI-based food wastage prediction
- 📍 Real-time NGO matching using location services
- 🏢 Multi-role authentication system
- ⏰ Food freshness & expiry tracking
- 📊 Analytics dashboard for monitoring donations
- 🔔 Real-time notifications and status updates
- 🌐 Scalable and responsive web application

---

# 🧠 Machine Learning Module

The prediction engine estimates potential surplus food using historical and real-time data.

## Workflow
1. Data Collection
2. Data Preprocessing
3. Feature Engineering
4. Model Training
5. Surplus Prediction

## Parameters Considered
- Event attendance
- Meal timings
- Historical leftovers
- Food category
- Seasonal trends

## Algorithms Used
- Linear Regression
- Random Forest Regression
- Decision Tree Regression

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript

## Backend
- Node.js / Flask
- REST APIs

## Database
- MongoDB / Firebase / MySQL

## Machine Learning
- Python
- Pandas
- NumPy
- scikit-learn

## APIs & Services
- Google Maps API
- Authentication System
- Notification Services

---

# 📂 Project Structure

```bash
FoodSync/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── ml-model/
│   ├── dataset/
│   ├── training/
│   ├── prediction/
│   └── model.pkl
│
├── database/
│
└── README.md
```

---

# ⚙️ System Architecture

```text
          ┌────────────────────┐
          │   Food Donors      │
          └─────────┬──────────┘
                    │
                    ▼
          ┌────────────────────┐
          │   FoodSync Web App │
          └─────────┬──────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼                              ▼
┌──────────────┐            ┌────────────────┐
│ ML Prediction│            │ NGO Matching   │
│   Engine     │            │ & Allocation   │
└──────┬───────┘            └────────┬───────┘
       ▼                              ▼
 ┌─────────────┐              ┌──────────────┐
 │ Analytics   │              │ Food Pickup  │
 │ Dashboard   │              │ & Tracking   │
 └─────────────┘              └──────────────┘
```

---

# 🔐 Security Features

- JWT Authentication
- Role-Based Access Control
- Secure API Handling
- Input Validation
- Data Sanitization

---

# 🌍 Real-World Impact

FoodSync aims to:
- Reduce edible food wastage
- Support hunger relief initiatives
- Improve food redistribution efficiency
- Promote sustainable food management

---

# 📈 Future Enhancements

- Mobile Application
- AI Demand Forecasting
- Route Optimization
- Blockchain-Based Transparency
- IoT Smart Inventory Integration

---

# 🏆 Hackathon Project

Developed during a hackathon to build a scalable and socially impactful solution using AI, web technologies, and real-time data processing.

---

# 👥 Team

Team FoodSync 🚀

---

# 📜 License

This project is developed for educational, research, and social impact purposes.
