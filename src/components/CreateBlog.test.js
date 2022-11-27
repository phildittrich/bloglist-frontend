import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Testtitle')
  await user.type(inputs[1], 'testauthor')
  await user.type(inputs[2], 'Testurl')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'Testtitle',
    author: 'testauthor',
    url: 'Testurl'
  })
})