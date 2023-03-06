import app from "./index";
import request from 'supertest'

describe('GET /event', () => {
    describe('test request with no passing params', () => {
        test('should resond with a 200 status', async () => {
            const res = await request(app).get('/event');
            expect(res.statusCode).toBe(200);
        })
        test('should specify json in the content type header', async() => {
          const res = await request(app).get('/event');
          expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    });
    describe('test request with passing params',()=>{
        test('should return 404 since no params is matched',async()=>{
            const res = await request(app).post('/events').send({
                date:'2023-04-09'
            });
            expect(res.statusCode).toBe(404);
        })
        test('should return with a 200 status',async()=>{
            const res = await request(app).post('/events').send({
                date:'2023-03-09'
            });
            expect(res.statusCode).toBe(200);
        })

    })
})