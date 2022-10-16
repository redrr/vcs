export class AjaxDataHandler {
  contentType : string;
  url : string;
  type : string;
  processData : boolean;

  constructor() {
    this.contentType = "application/json";
    this.url = "";
    this.type = "POST";
    this.processData = false;
  }

  public setContentType(type : string) : AjaxDataHandler {
    this.contentType = type;
    return this;
  }

  public setURL(url : string) : AjaxDataHandler {
    this.url = url;
    return this;
  }
}
