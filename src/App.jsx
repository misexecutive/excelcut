import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import { courses } from './data/courses'
import CoursePage from './pages/CoursePage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SendQuery from './pages/SendQuery'
import StudentReviews from './pages/StudentReviews'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'advanced-excel',
        element: <CoursePage course={courses.find((course) => course.id === 'advanced-excel')} />,
      },
      {
        path: 'power-bi',
        element: <CoursePage course={courses.find((course) => course.id === 'power-bi')} />,
      },
      {
        path: 'apps-script',
        element: <CoursePage course={courses.find((course) => course.id === 'apps-script')} />,
      },
      { path: 'student-reviews', element: <StudentReviews /> },
      { path: 'send-query', element: <SendQuery /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
