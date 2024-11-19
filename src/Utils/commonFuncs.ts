export const extractUsernamesFromTags = (text: string) => {
  const regex = /@(\w+)/g; // Matches @ followed by word characters and captures the word
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};

export const getTimePassed = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the time difference is less than a minute
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  // If the time difference is less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // If the time difference is less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  // If the time difference is less than a year
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 365) {
    return `${diffInDays}d`;
  }

  // For larger time differences (years)
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y`;
};
