import {Button} from "./Button";
import {ButtonType} from "./ButtonType";

export class PDFButton extends Button {

  private pageSize : string;
  private download : string;
  private exportOptions : any;

  constructor() {
    super();
    this.setClassName("btn-sm btn-danger");
    this.setText('<i class="far fa-file-pdf mr-2"></i> PDF');
    this.setExtend(ButtonType.PDF);
    this.pageSize = "LEGAL";
    this.download = "open";
  }

  public setPageSize(pageSize : string) : PDFButton {
    this.pageSize = pageSize;
    return this;
  }

  public setDownload(download : string) : PDFButton {
    this.download = download;
    return this;
  }

  public setExportOptions(opt : any) : PDFButton {
    this.exportOptions = opt;
    return this;
  }

  static ExportOptions = class {
    private columns : string;

    constructor(selector : string) {
      this.columns = selector
    }
  }
}
