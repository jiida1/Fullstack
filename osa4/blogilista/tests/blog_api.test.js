
const supertest=require('supertest')
const mongoose=require('mongoose')
const helper=require('./test_helper')
const app=require('../app')
const Blog=require('../mallit/blog')
const { initialBlogs } = require('./test_helper')
const api=supertest(app)




beforeEach(async()=>{
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs){
    let blogObject=new Blog(blog)
    await blogObject.save()
    }
})

test('blogs are returned as json',async()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('all blogs are returned',async()=>{
    const response=await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog id fiel is named id',async()=>{
    const response=await api.get('/api/blogs')
    const blogs=response.body

    blogs.forEach(blog=>{
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()

    })
})

test('blog can be added',async()=>{
    const newBlog={
        title:'Testi',
        author:'Teppo testaaja',
        url:'www.testi.com',
        likes:100,
    }
    await api.post('/api/blogs').send(newBlog)
    const afterBlogs= await helper.blogsInDb()
    expect(afterBlogs).toHaveLength(initialBlogs.length+1)
})

test('Like attribute is missing, likes should be 0',async()=>{
    const newBlog={
        title:'Uusi',
        author:'Teppo Testaaja',
        url:'www.testi.fi'
    }

    const response=await api.post('/api/blogs').send(newBlog)
        .expect(201).expect('Content-Type',/application\/json/)
    
    expect(response.body.likes).toBe(0)
})

test('Blog title is missing',async()=>{
    const newBlog={
        author:'Testi teppo',
        url:'www.testi.com',
        likes:10
    }

    const response= await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)

})

test('Blog url is missing',async()=>{
    const newBlog={
        title:'Testi',
        author:'Testi Teppo',
        likes:2
    }
    const response= await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
})

test('Blog deleted succes', async()=>{
    const initialBlogs= await helper.blogsInDb()
    const delId=initialBlogs[1].id
    const newResponse= await api.delete(`/api/blogs/${delId}`)
    const newBlogsI= await helper.blogsInDb()
    expect (newBlogsI).toHaveLength(initialBlogs.length-1)
    expect (newResponse.status).toBe(204)
})

test('Blog updating success', async()=>{
    const blogsAtStart=await Blog.find({})
    const blogToUpdate=blogsAtStart[0]

    const updatedBlogData={likes: blogToUpdate.likes + 1,}

    await api.put(`/api/blogs/${blogToUpdate._id}`).send(updatedBlogData)
      .expect(200).expect('Content-Type', /application\/json/)

    const blogsAtEnd=await Blog.find({})
    const updatedBlog=blogsAtEnd.find(b=>b._id.toString()=== blogToUpdate._id.toString())

    expect(updatedBlog.likes).toBe(updatedBlogData.likes)
})

afterAll(()=>{
     mongoose.connection.close()
})