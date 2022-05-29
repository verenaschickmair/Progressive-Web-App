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
      email: string,
      phone: string,
      appointments: {
        date: string,
      }[],
    }
  ) { }
}
