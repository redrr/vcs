import {DataTableConfig} from "./DataTableConfig";
import 'angular-datatables';
import 'datatables.net';
import 'datatables.net-buttons';
import {Button} from "./elements/buttons/Button";
import {TokenStorageService} from "../../_services/token-storage.service";

declare function initFullSearch(j : any) : void;
declare function applyFullSearch(o : any): void;
declare var $: any;

export class ListUIBuilder {

  private table : any;
  private data : DataTableConfig;
  private cssSelector : string;
  private actionButtons : Button[];

  constructor() {
    this.table = undefined;
    this.data = new DataTableConfig();
    this.cssSelector = "";
    this.actionButtons = [];
  }

  public tableSelector(selector : string) : ListUIBuilder {
    this.cssSelector = selector;
    return this;
  }

  public config(data : DataTableConfig) : ListUIBuilder {
    this.data = data
    return this;
  }

  public addButton(btn : Button) : ListUIBuilder {
    this.actionButtons.push(btn);
    return this;
  }

  public addAction() : ListUIBuilder {
    return this;
  }

  public clearButtons() : ListUIBuilder {
    this.actionButtons = [];
    return this;
  }

  public build(tokenService: TokenStorageService) : any {
    initFullSearch({
      columns : this.data.allColumn(),
      dataSource: this.data.getDataHandler().url,
      css :   {
        selectClass :   'form-control',
        inputClass  :   'form-control'
      },
      locale  :   {
        showAll :   'Összes'
      },
      clear   :   '<button type="button" class="btn btn-danger btn-icon btn-sm m-0" style="z-index: 100;padding: 0.40625rem 1rem;"><i class="far fa-trash-alt"></i></button>'
    })
    //Basic config
    let that = this;
    this.table = $(this.cssSelector);
    let configJSON = JSON.parse(JSON.stringify(this.data));
    configJSON.ajax.data = function(json:any) {
      json.token = tokenService.getToken()
      return JSON.stringify(json)
    };
    for (let i = 0; i <configJSON.columns.length; i++) {
      let col = this.data.allColumn()[i]
      configJSON.columns[i].render = function(data: any, type: any, row: any) {
        return col.render ? col.render(data, type, row) : data
      }
    }
    configJSON.initComplete = function () {
      applyFullSearch(this);
    };
    let table = this.table.DataTable(configJSON);

    //Setup Crud Actions
    let arr: any[] = [];
    this.actionButtons.forEach(function (value, index, array) {
      let btn = JSON.parse(JSON.stringify(value));
      btn.action = value.getAction();
      arr.push(btn);
    })

    new $.fn.dataTable.Buttons( table, {
      buttons: arr
    });
    table.buttons( 1, null ).container().prependTo(
      table.table().container()
    );
    console.log(configJSON)
    return table;
  }
}
