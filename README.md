# Laxna's Kitchen 🍽️ - A Cloud Kitchen Solution

## Revolutionizing Food Delivery & Management

🌐 **Live Website:** [Laxna's Kitchen](https://laxnas-kitchen-frontend-project.onrender.com/)

**Laxna's Kitchen** is a **cloud kitchen platform** designed to streamline food ordering and delivery services. This project aims to create a seamless experience for customers, kitchen owners, and delivery partners.

---

## 📌 Features
- ✅ **User-friendly ordering system** with a modern UI/UX
- ✅ **Secure authentication** (Login/Signup for customers and admins)
- ✅ **Cart & Order Management**
- ✅ **Real-time order tracking**
- ✅ **Twilio SMS notifications** for order updates
- ✅ **Admin dashboard** to manage menu, orders, and users
- ✅ **Cloud-based storage for images**

---

## 🛠 Tech Stack
### **Frontend (React)**
- React.js
- React Router
- Context API for state management
- Tailwind CSS (or your chosen styling framework)

### **Backend (Node.js & Express)**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT authentication
- Twilio for SMS notifications
- Multer for image uploads

---

## 🛠 Setup & Installation
### **Clone the Repository**
```sh
git clone https://github.com/yourusername/laxnas-kitchen.git
cd laxnas-kitchen
```

### **Backend Setup**
```sh
cd backend
npm install
npm start
```

### **Frontend Setup**
```sh
cd frontend
npm install
npm start
```

### **Admin Panel Setup**
```sh
cd admin
npm install
npm start
```

---

## 🚀 API Endpoints
### **User Authentication**
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login with credentials

### **Food Menu**
- `GET /api/food` - Get all available food items
- `POST /api/food/add` - Add a new food item (Admin only)

### **Cart Management**
- `POST /api/cart/add` - Add items to the cart
- `GET /api/cart` - Retrieve cart items

### **Order Management**
- `POST /api/order/create` - Place an order
- `GET /api/order/:id` - Get order details

### **SMS Notifications**
- `POST /api/order/sms-notify` - Send an order notification via Twilio

---

## 📧 Contact
For queries, reach out at:
📩 **Email:** laxnaskitchen@gmail.com  
🌍 **Website:** [Laxna's Kitchen](https://laxnas-kitchen-frontend-project.onrender.com/)

🚀 **Laxna's Kitchen - Bringing Delicious Food to Your Doorstep!** 🚀
