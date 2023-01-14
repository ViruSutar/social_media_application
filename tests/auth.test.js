const express = require("express");
const request = require("supertest");
const app = express();
const jwt = require("jsonwebtoken");
const connectDb = require("../app/Config/db");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const User = require("../app/Models/User");
dotenv.config({ path: "./.env" });

// we just want express application before listen is called. why ?

// describe("insert", () => {

//   beforeAll(async () => {
//      await mongoose.connect(process.env.MONGO_URL, {
//       autoIndex: true, // Don't build indexes
//       maxPoolSize: 100, // Maintain up to 200 socket connections
//       minPoolSize: 10,
//       serverSelectionTimeoutMS: 30000, // Keep trying to send operations for 5 seconds
//       socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//       family: 4,
//     });

//     mongoose.set("debug", true);
//     mongoose.set("strictQuery", true);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("should insert a doc into collection", async () => {
//      const mockUser = await User.cre({name:"viraj",email:"viraj@gmail.com"})

//     const insertedUser = await User.findOne({_id:mockUser._id},{name:1,email:1});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });

describe('POST /login', () => {
  it('should return a JWT token for valid credentials', () => {
    // Mock validCredentials function
    // validCredentials.mockReturnValue(true);
    // Send login request
    return request(app)
      .post('/api/Auth/login')
      .send({ email: 'user@example.com', password: 'password' })
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('token');
        // Verify JWT token
        const { email } = jwt.verify(res.body.token, secret);
        expect(email).toBe('user@example.com');
      });
  });
  it('should return 401 for invalid credentials', () => {
    // Send login request
    return request(app)
      .post('/api/Auth/login')
      .send({ email: 'user@example.com', password: 'wrongpassword' })
      .expect(401)
      .then(res => {
        expect(res.body).toHaveProperty('message', 'Invalid email or password');
      });
  });
});