export const formatDuration = (secondstr: string) => {
  const seconds = parseInt(secondstr);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} days`);
  if (hours > 0) parts.push(`${hours} hours`);
  if (minutes > 0) parts.push(`${minutes} mins`);
  if (remainingSeconds > 0) parts.push(`${remainingSeconds} seconds`);

  return parts.length > 0 ? parts.join(' ') : '0 seconds';
}; 