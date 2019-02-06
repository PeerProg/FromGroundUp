export default expiryDate => {
  const endDate = new Date(expiryDate);
  const today = new Date();
  const ONE_HOUR_IN_MS = 1000 * 60 * 60;
  if (today > endDate) return 'Expired';
  const RAW_TOTAL_DURATION_IN_HOURS = (endDate - today) / ONE_HOUR_IN_MS;
  const ROUNDED_DURATION_IN_HOURS = Math.round(RAW_TOTAL_DURATION_IN_HOURS);
  const ROUNDED_DURATION_IN_DAYS = Math.round(RAW_TOTAL_DURATION_IN_HOURS / 24);
  return ROUNDED_DURATION_IN_HOURS < 48
    ? `${ROUNDED_DURATION_IN_HOURS} hours`
    : `${ROUNDED_DURATION_IN_DAYS} days`;
};
