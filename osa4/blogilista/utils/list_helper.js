const _ =require('lodash')

const dummy=(blogs)=>{
    return 1;
}

const totalLikes=(blogs)=>{
    return blogs.reduce((sum, blog)=>sum+blog.likes, 0)
}

const favoriteBlog=(blogs)=>{
    if (blogs.length===0){
        return null
    }

    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes>favorite.likes) {
            favorite = blog
        }
    })
  
    return{
        title:favorite.title,
        author:favorite.author,
        likes:favorite.likes
    }
}

const mostBlogs=(blogs)=>{
    if (blogs.length===0){
        return null
    }

    const authorGroups = _.groupBy(blogs,'author')
    const authorBlogCounts=_.map(authorGroups, (authorBlogs, author)=>({
        author:author,
        blogs: authorBlogs.length
    }))

    const mostBlogsAuthor=_.maxBy(authorBlogCounts,'blogs')
    return mostBlogsAuthor
}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}