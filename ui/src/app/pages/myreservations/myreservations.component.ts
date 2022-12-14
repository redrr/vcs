import {Component} from '@angular/core';
import {RestUIBuilder} from "../../ui-builder/RestUIBuilder";
import {CrudService} from "../../_services/crud.service";
import {ListUIBuilder} from "../../ui-builder/list/ListUIBuilder";
import {DataTableConfig} from "../../ui-builder/list/DataTableConfig";
import {Column} from "../../ui-builder/list/elements/Column";
import {AjaxDataHandler} from "../../ui-builder/list/elements/AjaxDataHandler";
import {Button} from "../../ui-builder/list/elements/buttons/Button";
import {ButtonType} from "../../ui-builder/list/elements/buttons/ButtonType";
import {jsPDF} from "jspdf";
import {FieldType} from "../../ui-builder/list/elements/FieldType";
import {TokenStorageService} from "../../_services/token-storage.service";
import {ReservationFormComponent} from "../../forms/reservation-form/reservation-form.component";

@Component({
  selector: 'app-reservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.scss']
})
export class MyreservationsComponent extends RestUIBuilder {

  constructor(public service: CrudService, public tokenService: TokenStorageService, public form: ReservationFormComponent) {
    super(tokenService);
  }

  dataRestEndpoint(): string {
    return "http://localhost:8080/api/myreservations/";
  }

  dataTableConfig(): ListUIBuilder {
    return new ListUIBuilder()
      .tableSelector('table')
      .config(new DataTableConfig()
        .column(new Column().setData("id").setTitle("ID").setClassName("id-col hidden-col").hidden())
        .column(new Column().setData("vehicle").setTitle("Vehicle"))
        .column(new Column().setData("placeOfDelegation").setTitle("Place Of Delegation"))
        .column(new Column().setData("startOfDelegation").setTitle("Start Of Delegation").setFilterField(FieldType.DATERANGE))
        .column(new Column().setData("endOfDelegation").setTitle("End Of Delegation").setFilterField(FieldType.DATERANGE))
        .column(new Column().setData("status").setTitle("Status").setRenderer((data:any, type:any, row:any) => this.badgeRenderer(data)))
        .dataHandler(new AjaxDataHandler().setURL(this.dataRestEndpoint().concat("data")))
      )
      .addButton(new Button()
        .setText("<i class=\"fas fa-plus mr-2\"></i> ??j")
        .setClassName("btn-sm btn-info")
        .setAction(() => this.form.open()))
      .addButton(new Button()
        .setText("<i class=\"fas fa-download mr-2\"></i> Meghatalmaz??s")
        .setClassName("btn-sm btn-info")
        .setExtend(ButtonType.SELECTED)
        .setAction(() => this.generatePDF()));
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

  generatePDF(): void {
    if (this.getSelected()) {
      this.service.findById('reservations', this.getSelected()._id).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data))
        console.log(res)
        let doc: jsPDF = new jsPDF();
        doc.setFont("times");
        doc.setFontSize(16);
        doc.text("Meghatalmaz??s", 85, 20)
        doc.setFontSize(12);
        doc.text("A XY ZRT. (1107 Budapest, Alma utca 5.), meghatalmazza dolgoz??j??t:", 20, 30, )
        doc.text("N??v: ".concat(res.user.fullName), 20, 35, )
        doc.text("Szem. ig. sz??m: ".concat(res.user.idCardNumber), 20, 40, )
        doc.text("Sz??l.: ".concat(res.user.birthDate), 20, 45, )
        doc.text("Hogy a v??llalat ??ltal b??relt al??bbi g??pj??rm??vet: ", 20, 55, )
        doc.text("T??pus: ".concat(res.vehicle.manufacturer).concat(" ").concat(res.vehicle.type), 20, 60, )
        doc.text("Rendsz??m: ".concat(res.vehicle.licensePlateNumber), 20, 65, )
        doc.text("Alv??zsz??m: ".concat(res.vehicle.chassisNumber), 20, 70, )
        doc.text("Magyarorsz??gon ??s a biztos??t??si z??ldk??rty??n felt??ntetett orsz??gok ter??let??n haszn??lja.", 20, 75, )
        doc.text("Jelen meghatalmaz??s ??rv??nyes visszavon??sig.", 20, 85, )
        doc.text("Budapest, 2021. december 03. ", 20, 95, )
        doc.save("meghatalmazas.pdf");
      })
    }
  }
}
