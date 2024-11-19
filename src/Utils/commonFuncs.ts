export const extractUsernamesFromTags = (text: string) => {
  const regex = /@(\w+)/g; // Matches @ followed by word characters and captures the word
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};

export const getTimePassed = (timeInMillis: number): string => {
  const currentTime = new Date().getTime();
  const timePassedInSecs = (currentTime - timeInMillis) / 1000;
  const timePassedInMns = Math.ceil(timePassedInSecs / 60);
  const timePassedInHrs = Math.floor(timePassedInMns / 60);
  if (timePassedInSecs <= 60) {
    return `${
      Math.floor(timePassedInSecs) > 0 ? Math.floor(timePassedInSecs) : 0
    } ${Math.floor(timePassedInSecs) > 1 ? "seconds" : "second"} ago`;
  }
  if (timePassedInMns <= 60) {
    return `${timePassedInMns} ${
      Math.floor(timePassedInMns) > 1 ? "minutes" : "minute"
    } ago`;
  }
  if (timePassedInHrs <= 23) {
    return `${timePassedInHrs} ${
      Math.floor(timePassedInHrs) > 1 ? "hours" : "hour"
    } ago`;
  }
  return `${Math.floor(timePassedInHrs / 24)} ${
    Math.floor(timePassedInHrs / 24) > 1 ? "days" : "day"
  } ago`;
};
