const blogsRouter=require('express').Router()
const { request, response } = require('../app')
const blog = require('../mallit/blog')
const Blog=require('../mallit/blog')

blogsRouter.get('/', (request,response)=>{
    Blog.find({}).then(blogs=>{
        response.json(blogs)
    })
})

blogsRouter.post('/', async (request,response)=>{
    const body=request.body

    if(!request.body.title && !request.body.url){
        response.status(400).end()
    }

    const blog=new Blog({
        title:body.title,
        author: body.author,
        url:body.url,
        likes:body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',async(request, response)=>{
    const id=request.params.id

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
        
})

blogsRouter.put('/:id',async(req, res)=>{
    const blog=await Blog.findById(req.params.id)
    const body=req.body

    const newBlog={
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
    }
    
    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, newBlog)
    res.json(updatedBlog)    
    
})

module.exports=blogsRouter