export class User {
  _id: string;
  name: string;
  email: string;
  date: string;
  _v: number;
  constructor(obj: any) {
    this._id = (obj && obj._id) || null;
    this.name = (obj && obj.name) || null;
    this.email = (obj && obj.email) || null;
    this.date = (obj && obj.date) || null;
    this._v = (obj && obj._v) || null;
  }
}
