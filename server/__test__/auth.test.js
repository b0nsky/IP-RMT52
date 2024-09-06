const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

beforeAll(async () => {
    await User.create({ email: "testuser@test.com", password: "test123", role: "User" });
});

afterAll(async () => {
    await User.destroy({ truncate: true, cascade: true });
});

describe("POST /login", () => {
    it("should login successfully and return a token", async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: "testuser@test.com",
            password: "test123"
        })
        .expect(200);

        expect(response.body).toHaveProperty("access_token");
    });

    it("should return 401 for invalid email/password", async () => {
        const response = await request(app)
        .post('/login')
        .send({
            email: "invalid@test.com",
            password: "wrongpassword"
        })
        .expect(401);

        expect(response.body.message).toBe("Invalid email or password");
    });
});
