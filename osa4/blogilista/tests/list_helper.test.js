const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

   
describe('dummy',()=>{
    test('dummy returns 1', () => {
    const result = listHelper.dummy([])
    assert.strictEqual(result, 1)
    })
})

const listWithOneBlog=[
    {
        title:'joopa joo',
        author:'jepulis',
        url:'https://www.joo-kodit.fi/',
        likes:5,
        __v:0
    }
]
const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
      likes: 10,
      __v: 0
    },
  ]

  const listWithNoBlogs = []

describe('total likes',()=>{

    
      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
      })
    
      test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 27)
      })
    
      test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithNoBlogs)
        assert.strictEqual(result, 0)
      })
    })

    describe('favorite blog', () => {
        
      
        test('when list has multiple blogs, returns the one with most likes', () => {
          const result = listHelper.favoriteBlog(listWithMultipleBlogs)
          assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
            })
        })
      
        test('when list has one blog, returns that blog', () => {
          const result = listHelper.favoriteBlog(listWithOneBlog)
          assert.deepStrictEqual(result, {
            title: 'joopa joo',
            author: 'jepulis',
            likes: 5
          })
        })
      
        test('when list has no blogs, returns null', () => {
          const result = listHelper.favoriteBlog(listWithNoBlogs);
          assert.strictEqual(result, null)
        })
      })
      
      describe('Most blogs author', () => {
        
      
        test('when list has multiple blogs, returns most blogs author ', () => {
          const result = listHelper.mostBlogs(listWithMultipleBlogs)
          assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 2
            })
        })
      
        test('when list has one blog, returns that author', () => {
          const result = listHelper.mostBlogs(listWithOneBlog)
          assert.deepStrictEqual(result, {
            author: 'jepulis',
            blogs:1
          })
        })
      
        test('when list has no blogs, returns null', () => {
          const result = listHelper.mostBlogs(listWithNoBlogs);
          assert.strictEqual(result, null)
        })
      }) 
