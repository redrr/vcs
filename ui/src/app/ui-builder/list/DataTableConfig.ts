import {Column} from "./elements/Column";
import {Button} from "./elements/buttons/Button";
import {AjaxDataHandler} from "./elements/AjaxDataHandler";
import {ExcelButton} from "./elements/buttons/ExcelButton";
import {PDFButton} from "./elements/buttons/PDFButton";

export class DataTableConfig {

  private select : any;
  private responsive : boolean;
  private ordering : boolean;
  private searching : boolean;
  private colReorder : boolean;
  private serverSide : boolean;
  private processing : boolean;
  private deferRender : boolean;
  private dom : string;
  private columns : Column[];
  private buttons : any[];
  private ajax : AjaxDataHandler;

  constructor() {
    this.select = {
      style : 'single'
    };
    this.responsive = true;
    this.ordering = true;
    this.searching = true;
    this.colReorder = true;
    this.serverSide = true;
    this.processing = true;
    this.deferRender = true;
    this.dom = 'Blrtip';
    this.columns = [];
    this.buttons = [];
    this.ajax = new AjaxDataHandler();
    this.buttons.push(new ExcelButton().setAutoFilter(true).setFooter(true).setSheetName("teszt"));
    this.buttons.push(new PDFButton().setExportOptions(new PDFButton.ExportOptions(":visible")));
  }

  public disableButtons() : DataTableConfig {
    this.buttons = [];
    return this;
  }

  public multiSelect() : DataTableConfig {
    this.select.style = 'multi';
    return this;
  }

  public deferRendering(renderer : boolean) : DataTableConfig {
    this.deferRender = renderer;
    return this;
  }

  public order(order : boolean) : DataTableConfig {
    this.ordering = order;
    return this;
  }

  public columnReorder(columnReorder : boolean) : DataTableConfig {
    this.colReorder = columnReorder;
    return this;
  }

  public setServerSide(serverSide : boolean) : DataTableConfig {
    this.serverSide = serverSide;
    return this;
  }

  public setProcessing(processing : boolean) : DataTableConfig {
    this.processing = processing;
    return this;
  }

  public search(search : boolean) : DataTableConfig {
    this.searching = search;
    return this;
  }

  public domLayout(dom : string) : DataTableConfig {
    this.dom = dom;
    return this;
  }

  public column(column : Column) : DataTableConfig {
    this.columns.push(column);
    return this;
  }

  public allColumn() : Column[] {
    return this.columns
  }

  public button(button : Button) : DataTableConfig {
    this.buttons.push(button);
    return this;
  }

  public dataHandler(handler : AjaxDataHandler) : DataTableConfig {
    this.ajax = handler;
    return this;
  }

  public getDataHandler() : AjaxDataHandler {
    return this.ajax
  }
}
