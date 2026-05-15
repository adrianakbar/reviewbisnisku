import { test, expect } from '@playwright/test';
import { prisma } from '../lib/prisma';

test.describe('API and PostgreSQL Database Tests', () => {
  const testEmail = `testuser_${Date.now()}@example.com`;
  
  test('POST /api/register creates a new user in PostgreSQL', async ({ request }) => {
    // 1. Call the API
    const response = await request.post('/api/register', {
      data: {
        name: 'Test API User',
        email: testEmail,
        password: 'password123'
      }
    });
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toBe('Registrasi berhasil');

    // 2. Verify in PostgreSQL via Prisma
    const userInDb = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    
    expect(userInDb).not.toBeNull();
    expect(userInDb?.email).toBe(testEmail);
    expect(userInDb?.name).toBe('Test API User');
  });

  test('POST /api/orders creates a new order in PostgreSQL', async ({ request }) => {
    // 1. Call the API using multipart form data
    const response = await request.post('/api/orders', {
      multipart: {
        businessName: 'Test API Business',
        mapsUrl: 'https://maps.test.com',
        reviewsCount: '10',
        targetStar: '5',
        notes: 'API Test order',
        totalPrice: '50000',
      }
    });

    expect(response.status()).toBe(201);
    const order = await response.json();
    expect(order.businessName).toBe('Test API Business');
    
    // 2. Verify in PostgreSQL
    const orderInDb = await prisma.order.findUnique({
      where: { id: order.id }
    });
    
    expect(orderInDb).not.toBeNull();
    expect(orderInDb?.businessName).toBe('Test API Business');
    expect(orderInDb?.totalPrice).toBe(50000);
    expect(orderInDb?.status).toBe('Pending');
  });

  // Cleanup after tests
  test.afterAll(async () => {
    // Remove the test user and order to keep DB clean
    await prisma.user.deleteMany({
      where: { email: testEmail }
    });
    await prisma.order.deleteMany({
      where: { businessName: 'Test API Business' }
    });
  });
});
