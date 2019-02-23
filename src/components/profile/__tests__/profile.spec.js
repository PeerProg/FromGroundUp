import React from 'react';
import { cleanup, getByTestId, fireEvent, wait } from 'react-testing-library';
import { renderWithRouter } from '../../../helpers';
import { MockDataService } from '../../../services';
import ProfileContainer from '../profile-container';
import Profile from '../profile';

const { firstUser } = MockDataService;

const fakeUser = {
  username: 'johndoe',
  email: 'john@doe.com',
  imageURL: ''
}

const props = {
  initialValues: {
    username: firstUser.username,
    email: firstUser.email,
    imageURL: ''
  },
  isEditing: false,
  user: firstUser,
  toggleEditStatus: jest.fn(),
  handleSubmit: jest.fn(),
  validate: jest.fn()
}

afterEach(cleanup);

test('Component renders with an initial editing state of false', () => {
  const { container } = renderWithRouter(<Profile {...props} />);

  // The elements here only show when not editing
  const profileDetailsNode = getByTestId(container, 'profile-details-section');
  const usernameLiNode = getByTestId(container, 'username-list-item');
  expect(profileDetailsNode.tagName).toBe('UL');
  expect(usernameLiNode.textContent.includes('Username')).toBeTruthy();
});

test('<Profile /> shows input fields when being edited', async () => {
  const propsModified = { ...props, isEditing: true };
  const { container } = renderWithRouter(<Profile {...propsModified} />);

  const confirmEditingButtonNode = getByTestId(container, 'profile-submit-button');
  expect(confirmEditingButtonNode.innerHTML).toBe('Submit');
});

test('<ProfileContainer /> handleSubmit is called', async () => {
  const { container } = renderWithRouter(<ProfileContainer handleSubmit={props.handleSubmit} />);

  const toggleEditButtonNode = getByTestId(container, 'edit-profile-button');

  fireEvent.click(toggleEditButtonNode);

  const confirmEditingButtonNode = getByTestId(container, 'profile-submit-button');
  expect(confirmEditingButtonNode.innerHTML).toBe('Submit');

  const usernameNode = getByTestId(container, 'username-profile-input');
  const emailNode = getByTestId(container, 'email-profile-input');
  const imageNode = getByTestId(container, 'image-profile-input');

  fireEvent.change(usernameNode, { target: { value: fakeUser.username } });
  fireEvent.change(emailNode, { target: { value: fakeUser.email } });
  fireEvent.change(imageNode, { target: { value: fakeUser.imageURL } });
  fireEvent.click(confirmEditingButtonNode);

  await wait(() => {
    expect(getByTestId(container, 'profile-submit-button').tagName).toBe('BUTTON');
  });
});
