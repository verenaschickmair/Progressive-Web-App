export class Offer {
  constructor(
    public id: number,
    public categories: number[],
    public title: string,
    public status: "publish",
    public acf: {
      title: string,
      description: string,
      user: number,
      subject: string,
      first_name: string,
      last_name: string,
      appointments: {
        date: string,
      }[],
    }
  ) { }
}
