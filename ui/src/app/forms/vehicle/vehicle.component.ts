import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CrudService} from "../../_services/crud.service";
import {VehicleDTO} from "./VehicleDTO";
import {FormUIBuilder} from "../../ui-builder/FormUIBuilder";
import {FormConfig} from "../../ui-builder/form/FormConfig";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent extends FormUIBuilder {

  model = new VehicleDTO()

  users:any[] = []

  constructor(public modalService: NgbModal, public crudService: CrudService) {
    super(modalService, crudService)
  }

  ngOnInit(): void {
    this.crudService.findAll("users").subscribe(res => {
      this.users = JSON.parse(JSON.stringify(res))
    })
  }

  formConfig(cfg: FormConfig): FormConfig {
    return cfg.setSelector("#addVehicleModal").setService("vehicles");
  }

  preEditOpen(data: Object): void {
    let json = JSON.parse(JSON.stringify(data))
    this.model = new VehicleDTO(data)
    this.model.responsibleUser = this.getIndexOf(json.responsibleUser, this.users)
    console.log(this.model)
  }

  preNewOpen(): void {
    this.model = new VehicleDTO()
  }

  preSubmit(data: any): any {
    data.responsibleUser = this.users[data.responsibleUser]
    return data
  }
}
