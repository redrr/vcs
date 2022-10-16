import {ButtonType} from "./ButtonType";

export class Button {

  private action : any;
  private className : string;
  private extend : string;
  private key : string;
  private text : string;

  constructor() {
    this.className = "";
    this.extend = "";
    this.key = "";
    this.text = "";
  }

  public setClassName(className : string) : Button {
    this.className = className;
    return this;
  }

  public setAction(action : any) : Button {
    this.action = action;
    return this;
  }

  public setExtend(extend : ButtonType) : Button {
    this.extend = ButtonType[extend].toLowerCase();
    return this;
  }

  public setKey(key : string) : Button {
    this.key = key;
    return this;
  }

  public setText(text : string) : Button {
    this.text = text;
    return this;
  }

  public getAction() : any {
    return this.action;
  }
}
