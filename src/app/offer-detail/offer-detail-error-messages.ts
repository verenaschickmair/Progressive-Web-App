export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const CommentFormErrorMessages = [
  new ErrorMessage('text', 'required', 'Zum Absenden eines Kommentars bitte einen Text eingeben.'),
  new ErrorMessage('text', 'minlength', 'Das Kommentar muss mindestens 10 Zeichen enthalten.'),
];
