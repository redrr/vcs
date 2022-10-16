export class FormConfig {
  private _selector?: string
  private _service?: string


  get selector(): string {
    return this._selector || "";
  }

  setSelector(value: string): FormConfig {
    this._selector = value;
    return this;
  }

  get service(): string {
    return this._service || "";
  }

  setService(value: string): FormConfig {
    this._service = value;
    return this;
  }
}
