import {Button} from "./Button";
import {ButtonType} from "./ButtonType";

export class ExcelButton extends Button {

  private autoFilter : boolean;
  private footer : boolean;
  private title : string;
  private sheetName : string;

  constructor() {
    super();
    this.setClassName("btn-sm btn-success");
    this.setText('<i class="far fa-file-excel mr-2"></i>Excel');
    this.setExtend(ButtonType.EXCEL);
    this.autoFilter = true;
    this.footer = false;
    this.title = "untitled";
    this.sheetName = "untitled";
  }

  public setAutoFilter(filter : boolean) : ExcelButton {
    this.autoFilter = filter;
    return this;
  }

  public setFooter(footer : boolean) : ExcelButton {
    this.footer = footer;
    return this;
  }

  public setTitle(title : string) : ExcelButton {
    this.title = title;
    return this;
  }

  public setSheetName(sheetName : string) : ExcelButton {
    this.sheetName = sheetName;
    return this;
  }
}
