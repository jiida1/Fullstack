
const Blog = require('../mallit/blog')


const initialBlogs=[
    {
        title:'Eka blogi',
        author:'Eka author',
        url:'http://esimerkki.com/eka',
        likes:1
    },
    {
        title:'Toka blogi',
        author:'Toka author',
        url:'http://esimerkki.com/toka',
        likes:2
    }
]



const nonExistingId = async () => {
  const blog = new Blog({Title: 'TestiBlogi', author: 'Meikä mandoliini', url: 'www.testiblogi.fi', likes: 1,})
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



module.exports = {
  initialBlogs, nonExistingId, blogsInDb,
}