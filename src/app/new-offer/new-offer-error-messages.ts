export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const NewOfferErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Name für das Angebot muss angegeben werden'),
  new ErrorMessage('title', 'minlength', 'Bitte mindestens 3 Zeichen angeben'),
  new ErrorMessage('description', 'minlength', 'Die Beschreibung muss mindestens 10 Zeichen enthalten'),
  new ErrorMessage('description', 'maxlength', 'Die Beschreibung darf höchstens 1000 Zeichen haben'),
  new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage('phone', 'required', 'Es muss eine Telefonnummer angegeben werden'),
  new ErrorMessage('email', 'required', 'Es muss eine Email-Adresse angegeben werden'),
  new ErrorMessage('email', 'email', 'Bitte ein gültiges Email-Format verwenden'),
];
