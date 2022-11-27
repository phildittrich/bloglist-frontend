import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockUpdate

  beforeEach(() => {
    const blog = {
      'title': 'Testtitle',
      'author': 'Testauthor',
      'url': 'Testurl',
      'likes': 2,
      'user': {
        'username': 'Testusername',
        'name': 'Testname',
        'id': 'a'
      },
      'id': '1'
    }

    const user = {
      token: '123',
      username: 'Testusername',
      name: 'Test User Name'
    }

    mockUpdate = jest.fn()
    const mockRemove = jest.fn()

    container = render(
      <Blog blog={blog} user={user} update={mockUpdate} remove={mockRemove} />
    ).container
  })

  test('initially renders title and author but not url and number of likes', async () => {
    const title = container.querySelector('.blog-title')
    expect(title).toHaveStyle('display: block')
    expect(title).toHaveTextContent('Testtitle')
    expect(title).toHaveTextContent('Testauthor')

    const url = container.querySelector('.blog-url')
    expect(url).toHaveStyle('display: none')
  })

  test('displays url and number of likes after clicking the show button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.blog-url')
    expect(div).not.toHaveStyle('display: none')
  })

  test('calls the update function twice when like is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})