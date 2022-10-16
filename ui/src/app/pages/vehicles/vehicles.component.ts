import {Component} from '@angular/core';
import {RestUIBuilder} from "../../ui-builder/RestUIBuilder";
import {CrudService} from "../../_services/crud.service";
import {ListUIBuilder} from "../../ui-builder/list/ListUIBuilder";
import {DataTableConfig} from "../../ui-builder/list/DataTableConfig";
import {Column} from "../../ui-builder/list/elements/Column";
import {AjaxDataHandler} from "../../ui-builder/list/elements/AjaxDataHandler";
import {Button} from "../../ui-builder/list/elements/buttons/Button";
import {ButtonType} from "../../ui-builder/list/elements/buttons/ButtonType";
import {TokenStorageService} from "../../_services/token-storage.service";
import {VehicleComponent} from "../../forms/vehicle/vehicle.component";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent extends RestUIBuilder {

  constructor(public service: CrudService, public tokenService: TokenStorageService, public form: VehicleComponent) {
    super(tokenService);
  }

  dataRestEndpoint(): string {
    return "http://localhost:8080/api/vehicles/";
  }

  dataTableConfig(): ListUIBuilder {
    return new ListUIBuilder()
      .tableSelector('table')
      .config(new DataTableConfig()
        .column(new Column().setData("id").setTitle("ID").setClassName("id-col hidden-col").hidden())
        .column(new Column().setData("licensePlateNumber").setTitle("License Plate Number"))
        .column(new Column().setData("manufacturer").setTitle("Manufacturer"))
        .column(new Column().setData("type").setTitle("Type"))
        .column(new Column().setData("chassisNumber").setTitle("Chassis Number"))
        .column(new Column().setData("responsibleUser").setTitle("Responsible User"))
        .dataHandler(new AjaxDataHandler().setURL(this.dataRestEndpoint().concat("data")))
      )
      .addButton(new Button()
        .setText("<i class=\"fas fa-plus mr-2\"></i> Új")
        .setClassName("btn-sm btn-info")
        .setAction(() => this.form.open()))
      .addButton(new Button()
        .setText("<i class=\"fas fa-edit mr-2\"></i> Szerkesztés")
        .setClassName("btn-sm btn-info")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.form.open(this.getSelected())))
      .addButton(new Button()
        .setText("<i class=\"fas fa-sticky-note mr-2\"></i> Matrica hozzáadás")
        .setClassName("btn-sm btn-info")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => {}))
      .addButton(new Button()
        .setText("<i class=\"fas fa-trash mr-2\"></i> Törlés")
        .setClassName("btn-sm btn-danger")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.service.delete('vehicles', this.getSelected())))
      ;
  }
}
