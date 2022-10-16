import {AfterViewInit, Component} from "@angular/core";
import {ListUIBuilder} from "./list/ListUIBuilder";
import "bootstrap-notify";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'list-ui-builder',
  template: ``
})
export abstract class RestUIBuilder implements AfterViewInit {

  private datatable : any;
  private selected  : any;
  private $: any;


  constructor(public tokenService: TokenStorageService) {
  }

  public abstract dataTableConfig() : ListUIBuilder;

  public abstract dataRestEndpoint() : string;

  ngAfterViewInit(): void {
    this.datatable = this.dataTableConfig().build(this.tokenService);
  }

  public getSelected() : any {
    let data = this.datatable.row('.selected').data();
    console.log(data)
    if (data) {
      this.selected = data._id;
    }
    return data;
  }

  public getSelection(): any[] {
    let arr = this.datatable.rows('.selected').data()
    let selection = [];
    for (let i = 0; i < arr.length; i++) {
      selection.push(arr[i]._id)
    }
    return selection
  }
}
