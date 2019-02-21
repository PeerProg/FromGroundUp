import swal from 'sweetalert2';
import moment from 'moment';
import { createNewHabit, createNewMilestone } from '../services';

export const createHabit = async ({ name, days }, { setSubmitting }, cb) => {
  try {
    const expiresAt = moment().add(days, 'days').format('MMMM DD YYYY, h:mm:ss a');
    const startsAt = moment().format('MMMM DD YYYY, h:mm:ss a');
    const result = await createNewHabit({ name, startsAt, expiresAt });
    const newHabitObject = {
      name: result.data.name,
      startsAt: result.data.startsAt,
      expiresAt: result.data.expiresAt,
      habitId: result.data.id,
      habitActive: result.data.habitActive,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
      milestones: result.data.milestones
    }
    cb(newHabitObject);
    return result.data.id;
  } catch (err) {
    swal({
      type: 'error',
      position: 'top-end',
      title: err.message,
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }
  setSubmitting(false);
}

export const createMilestone = async (
  { habitId, milestone },
  { setSubmitting },
  cb
) => {
  try {
    const result = await createNewMilestone({ habitId, title: milestone });
    cb({ habitId, data: result.data });
  } catch (err) {
    swal({
      type: 'error',
      position: 'top-end',
      title: err.message,
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }
  setSubmitting(false);
};
