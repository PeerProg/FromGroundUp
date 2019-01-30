export const signupValidator = inputObject => {
  let errors = {};
  if (!inputObject.email || !inputObject.username || !inputObject.password) {
    errors.email = !inputObject.email ? 'Email Required' : undefined;
    errors.username = !inputObject.username ? 'Username Required' : undefined;
    errors.password = !inputObject.password ? 'Password Required' : undefined;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputObject.email)
  ) {
    errors.email = 'Invalid email address';
  } else if (inputObject.password !== inputObject.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }
  return errors;
};

export const loginValidator = inputObject => {
  let errors = {};
  if (!inputObject.identifier || !inputObject.password) {
    errors.identifier = !inputObject.identifier
      ? 'Username or Email Required'
      : undefined;
    errors.password = !inputObject.password ? 'Password Required' : undefined;
  }
  return errors;
};

export const profilePageValidator = inputObject => {
  let errors = {};
  if (!inputObject.username || !inputObject.email) {
    errors.username = !inputObject.username
      ? 'Username cannot be blank'
      : undefined;
    errors.email = !inputObject.email ? 'Email cannot be blank' : undefined;
  }
  return errors;
};

export const habitNameValidator = inputObject => {
  let errors = {};
  const inputValueName = inputObject.name.trim();
  const inputValueDay = inputObject.days;
  if (!inputValueName || !inputValueDay) {
    errors.name = !inputValueName ? 'Habit name cannot be blank' : undefined;
    errors.days = !inputValueDay ? 'Number of Days cannot be blank' : undefined;
  } else if (inputValueName.length < 3) {
    errors.name = 'Habit name must be 3 characters or more';
  } else if (typeof inputValueDay === 'string') {
    errors.days = 'Number of Days must be a number';
  }
  return errors;
};

export const milestoneValidator = inputObject => {
  let errors = {};
  const inputValueHabit = inputObject.habit.trim();
  const inputValueMilestone = inputObject.milestone;
  if (!inputValueHabit || !inputValueMilestone) {
    errors.habit = !inputValueHabit
      ? 'Habit name field cannot be blank'
      : undefined;
    errors.milestone = !inputValueMilestone
      ? 'Milestone field cannot be blank'
      : undefined;
  } else if (inputValueHabit.length < 3 || inputValueMilestone.length < 3) {
    errors.habit = 'Habit name must be 3 characters or more';
    errors.milestones = 'Milestone must be 3 characters or more';
  }

  return errors;
};
