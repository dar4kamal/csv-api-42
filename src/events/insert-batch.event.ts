export default class InsertBatchEvent {
  id: number;
  payload: any[];

  constructor(id: number, payload: any[]) {
    this.id = id;
    this.payload = payload;
  }
}
