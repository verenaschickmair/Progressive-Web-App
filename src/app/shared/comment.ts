export class Comment {
  constructor(
    public categories: number[],
    public title: string,
    public status: "publish",
    public fields : {
       text: string,
       offer: number[],
       user: number,
    }
  ) { }
}
