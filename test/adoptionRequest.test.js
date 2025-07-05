const request = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const AdoptionRequest = require('../models/adoptionRequest.model');

beforeAll(async () => {
  await connectDB();
  await AdoptionRequest.deleteMany({});
  await AdoptionRequest.create([
    { _id: '64a9fa631234567890abcdef', userId: 'user1', petId: 'pet1', status: 'pending' }
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('PATCH /adoption-requests/:id', () => {
  it('should update the status to approved', async () => {
    const res = await request(app)
      .patch('/adoption-requests/64a9fa631234567890abcdef')
      .send({ status: 'approved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('approved');
  });

  it('should return 400 for invalid status', async () => {
    const res = await request(app)
      .patch('/adoption-requests/64a9fa631234567890abcdef')
      .send({ status: 'invalid_status' });

    expect(res.statusCode).toBe(400);
  });

  it('should return 404 if request id not found', async () => {
    const res = await request(app)
      .patch('/adoption-requests/64a9fa631234567890abc999')
      .send({ status: 'approved' });

    expect(res.statusCode).toBe(404);
  });
});
