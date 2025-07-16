# 🩸 Bloodline - Blood Donation Application

**Live Site**: [http://localhost:5173](http://localhost:5173)  
**Admin Email**: Admin@gmail.com  
**Admin Password**: Admin7788.

## 📌 Overview

**Bloodline** is a full-stack blood donation management system built using the MERN stack (MongoDB, Express.js, React, Node.js). It helps bridge the gap between blood donors and recipients by providing an efficient and user-friendly interface for creating, tracking, and fulfilling donation requests.

---
## 📑 Admin Access

You can use the following credentials to log in as admin:

- **Email**: `Admin@gmail.com`
- **Password**: `Admin7788`

---

## 🚀 Key Features

- 🔐 **Role-Based Access Control**  
  Includes three user roles: Admin, Donor, and Volunteer, each with distinct permissions.

- 📝 **Donor Registration & Profile Management**  
  Donors can register, update their profiles, and manage donation requests.

- 🩸 **Blood Donation Requests**  
  Donors and volunteers can create donation requests specifying location, blood group, and urgency.

- 🔍 **Advanced Donor Search**  
  Public users can search for donors based on blood group, district, and upazila.

- 📊 **Admin Dashboard**  
  Admins can view total users, donation stats, funding, and manage users and donation requests.

- ✍️ **Content Management System (CMS)**  
  Admins and volunteers can create, edit, publish/unpublish, and delete blog posts.

- 💰 **Stripe Payment Integration**  
  Users can donate funds to the organization. Admins can track total funding received.

- 📈 **Donation Analytics**  
  Admin dashboard shows donation request trends (daily, weekly, monthly) using charts.

- 🧑‍🤝‍🧑 **Volunteer Controls**  
  Volunteers can manage donation requests and contribute blog content.

- ✅ **Authentication with JWT**  
  Secure authentication using JSON Web Tokens for all private routes and protected APIs.

- ⚡ **Real-time Notifications**  
  SweetAlert and toast notifications are used for all CRUD and authentication actions.

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, TanStack Query, Axios
- **Backend**: Express.js, MongoDB, Node.js, JWT
- **Authentication**: JWT (Custom)
- **Payment Gateway**: Stripe
- **Image Hosting**: ImgBB
- **Rich Text Editor**: Jodit React

---

## 📂 Setup Instructions

1. Clone both client and server repositories.
2. Install dependencies using `npm install`.
3. Set up `.env` files for both client and server.
4. Run MongoDB locally or use a cloud DB like MongoDB Atlas.
5. Use `npm run dev` (client) and `npm run start` (server) to start the project.
6. Visit `http://localhost:5173` in your browser.

---


---

## 💻 Local Development

### Client:
```bash
cd client
npm install
npm run dev
````

### Server:

```bash
cd server
npm install
npm run start
```

---

## 🧪 Test Users

You may seed test users or manually register accounts. By default, all registered users are "Donors". Use MongoDB to update roles to "Volunteer" or "Admin" as needed.

---

## 📢 Note

* All private routes persist login state even on refresh.
* Firebase is **not used**. Custom JWT-based auth is implemented.
* All sensitive keys (MongoDB, Stripe, ImgBB) are stored securely in `.env` files.

---

## 🤝 Contributing

If you'd like to contribute, feel free to fork the repo and submit a pull request.

---

## 📧 Contact

For questions or feedback, please email: [ummesadiasayti@gmail.com](mailto:ummesadiasayti@gmail.com)

---
