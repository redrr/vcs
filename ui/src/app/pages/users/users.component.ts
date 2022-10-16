import {Component} from '@angular/core';
import {RestUIBuilder} from "../../ui-builder/RestUIBuilder";
import {ListUIBuilder} from "../../ui-builder/list/ListUIBuilder";
import {DataTableConfig} from "../../ui-builder/list/DataTableConfig";
import {Column} from "../../ui-builder/list/elements/Column";
import {AjaxDataHandler} from "../../ui-builder/list/elements/AjaxDataHandler";
import {Button} from "../../ui-builder/list/elements/buttons/Button";
import {CrudService} from "../../_services/crud.service";
import {ButtonType} from "../../ui-builder/list/elements/buttons/ButtonType";
import {UserComponent} from "../../forms/user/user.component";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends RestUIBuilder {

  constructor(public service: CrudService, private form : UserComponent, public tokenService: TokenStorageService) {
    super(tokenService);
  }

  dataRestEndpoint(): string {
    return "http://localhost:8080/api/users/";
  }

  dataTableConfig(): ListUIBuilder {
    return new ListUIBuilder()
      .tableSelector('table')
      .config(new DataTableConfig()
        .multiSelect()
        .column(new Column().setData("id").setTitle("ID").setClassName("id-col hidden-col").hidden())
        .column(new Column().setData("username").setTitle("Username"))
        .column(new Column().setData("fullName").setTitle("Full Name"))
        .column(new Column().setData("email").setTitle("Email"))
        .column(new Column().setData("idCardNumber").setTitle("ID Card Number"))
        .column(new Column().setData("birthDate").setTitle("Birth Date"))
        .column(new Column().setData("role").setTitle("Role"))
        .dataHandler(new AjaxDataHandler().setURL(this.dataRestEndpoint().concat("data")))
      )
      .addButton(new Button()
        .setText("<i class=\"fas fa-plus mr-2\"></i> Új")
        .setClassName("btn-sm btn-info")
        .setAction(() => this.form.open()))
      .addButton(new Button()
        .setText("<i class=\"fas fa-edit mr-2\"></i>Szerkesztés")
        .setClassName("btn-sm btn-info")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.form.open(this.getSelected())))
      .addButton(new Button()
        .setText("<i class=\"fas fa-trash mr-2\"></i> Törlés")
        .setClassName("btn-sm btn-danger")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.service.delete('users', this.getSelected())))
      ;
  }
}
