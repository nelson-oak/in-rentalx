interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  dateNow(): Date;
}

export { IDateProvider };
