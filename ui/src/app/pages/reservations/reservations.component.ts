import {Component} from '@angular/core';
import {RestUIBuilder} from "../../ui-builder/RestUIBuilder";
import {CrudService} from "../../_services/crud.service";
import {ListUIBuilder} from "../../ui-builder/list/ListUIBuilder";
import {DataTableConfig} from "../../ui-builder/list/DataTableConfig";
import {Column} from "../../ui-builder/list/elements/Column";
import {AjaxDataHandler} from "../../ui-builder/list/elements/AjaxDataHandler";
import {Button} from "../../ui-builder/list/elements/buttons/Button";
import {ButtonType} from "../../ui-builder/list/elements/buttons/ButtonType";
import {FieldType} from "../../ui-builder/list/elements/FieldType";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent extends RestUIBuilder {

  constructor(public service: CrudService, public tokenService: TokenStorageService) {
    super(tokenService);
  }

  dataRestEndpoint(): string {
    return "http://localhost:8080/api/reservations/";
  }

  dataTableConfig(): ListUIBuilder {
    return new ListUIBuilder()
      .tableSelector('table')
      .config(new DataTableConfig().multiSelect()
        .column(new Column().setData("id").setTitle("ID").setClassName("id-col hidden-col").hidden())
        .column(new Column().setData("user").setTitle("User"))
        .column(new Column().setData("vehicle").setTitle("Vehicle"))
        .column(new Column().setData("placeOfDelegation").setTitle("Place Of Delegation"))
        .column(new Column().setData("startOfDelegation").setTitle("Start Of Delegation").setFilterField(FieldType.DATERANGE))
        .column(new Column().setData("endOfDelegation").setTitle("End Of Delegation").setFilterField(FieldType.DATERANGE))
        .column(new Column().setData("status").setTitle("Status").setRenderer((data:any, type:any, row:any) => this.badgeRenderer(data)))
        .dataHandler(new AjaxDataHandler().setURL(this.dataRestEndpoint().concat("data")))
      )
      .addButton(new Button()
        .setText("<i class=\"fas fa-check mr-2\"></i> Elfogadás")
        .setClassName("btn-sm btn-success")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => {
          this.serverAction("accept", this.getSelection())
        }))
      .addButton(new Button()
        .setText("<i class=\"fas fa-times mr-2\"></i> Elutasítás")
        .setClassName("btn-sm btn-danger")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.serverAction("decline", this.getSelection())));
  }

  private serverAction(action: string, selection: any[]) {
    if (selection) {
      this.service.post("reservations/".concat(action), selection)
        .subscribe(res => window.location.reload())
    }
  }

  private badgeRenderer(data: any) {
    let color;
    switch (data) {
      case "ACCEPTED": color = "success"; break;
      case "DECLINED": color = "danger"; break;
      default: color = "primary"; break;
    }
    return '<span class="badge badge-lg badge-pill badge-'+color+'">'+data.toString().toLowerCase()+'</span>'
  }
}
