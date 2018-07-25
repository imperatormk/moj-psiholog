import NewBlogPage from './NewBlogPage'
import BlogPage from './BlogPage'

export default [{
  path: '/new-blog',
  name: 'newBlog',
  component: NewBlogPage
}, {
  path: '/blogs/:id',
  name: 'blog',
  component: BlogPage
}]