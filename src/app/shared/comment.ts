export class Comment {
  constructor(
    public id: number,
    public acf : {
       text: string,
       offer: number,
       user: number,
    }
  ) { }
}
