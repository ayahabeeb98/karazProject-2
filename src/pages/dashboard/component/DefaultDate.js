const now = new Date();
const offsetMs = now.getTimezoneOffset() * 60 * 1000;
const dateLocal = new Date(now.getTime() - offsetMs);
export const DateAndHour = dateLocal.toISOString().slice(0, 19).replace("T", " ");
export const DefaultDuration = dateLocal.toISOString().slice(0,10);

