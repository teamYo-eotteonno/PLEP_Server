export class CreateScheduleDto {
    title: string;
    date: string; // YYYY-MM-DD
    time?: string; // HH:mm:ss (optional)
    allDay: boolean;
    locationUrl?: string;
    memo?: string;
  }
  