export class Contact {
  constructor(
    public id: string,
    public firstName: string,
    public lastName?: string,
    public contactNumber?: string,
    public email?: string
  ) {}
}
