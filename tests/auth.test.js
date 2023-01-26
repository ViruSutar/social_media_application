const app = require('../app/app')
const request  =  require("supertest");



describe("GET /test",()=>{
    describe("testing route which will return users",() =>{

        test("should return users with 200 status code",async()=>{
            const response = await request(app).get('/test')

            expect(response.statusCode).toBe(200)
            // expect(response.body).toBe("testing route for test cases")
        })

    })
})


