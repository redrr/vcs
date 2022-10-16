import {Component} from '@angular/core';
import {ReservationDTO} from "./ReservationDTO";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CrudService} from "../../_services/crud.service";
import {VehicleDTO} from "../vehicle/VehicleDTO";
import {FormUIBuilder} from "../../ui-builder/FormUIBuilder";
import {FormConfig} from "../../ui-builder/form/FormConfig";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent extends FormUIBuilder{

  model = new ReservationDTO()
  users = []
  vehicles = []

  constructor(public modalService: NgbModal, public crudService: CrudService) {
    super(modalService, crudService)
  }

  ngOnInit(): void {
    this.crudService.findAll("users").subscribe(res => {
      this.users = JSON.parse(JSON.stringify(res))
    })
    this.crudService.findAll("vehicles").subscribe(res => {
      this.vehicles = JSON.parse(JSON.stringify(res))
    })
  }

  getIndexOf(data: any, arr: any[]): number {
    return arr.indexOf(data)
  }

  formConfig(cfg: FormConfig): FormConfig {
    return cfg.setSelector("#addReservationModal").setService("reservations");
  }

  preEditOpen(data: Object): void {
    let json = JSON.parse(JSON.stringify(data))
    this.model = new VehicleDTO(data)
    this.model.user = this.getIndexOf(json.user, this.users)
    this.model.vehicle = this.getIndexOf(json.vehicle, this.vehicles)
  }

  preNewOpen(): void {
    this.model = new VehicleDTO()
  }

  preSubmit(data: any): any {
    data.user = this.users[data.user]
    data.vehicle = this.vehicles[data.vehicle]
    return data;
  }

  vehicleToString(data: any): string {
    return data["manufacturer"]+" "+data["type"]+" ("+data["licensePlateNumber"]+")"
  }
}
