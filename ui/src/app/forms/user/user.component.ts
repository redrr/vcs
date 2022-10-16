import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {CrudService} from "../../_services/crud.service";
import {UserDTO} from "./UserDTO";
import {FormUIBuilder} from "../../ui-builder/FormUIBuilder";
import {FormConfig} from "../../ui-builder/form/FormConfig";

@Component({
  selector: 'user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends FormUIBuilder {

  model = new UserDTO()

  roles: any[] = []

  constructor(public modalService: NgbModal, public crudService: CrudService) {
    super(modalService, crudService)
  }

  ngOnInit(): void {
    this.crudService.findAll("roles").subscribe(res => {
      this.roles = JSON.parse(JSON.stringify(res))
    })
  }

  formConfig(cfg: FormConfig): FormConfig {
    return cfg.setSelector("#addUserModal").setService("users");
  }

  preEditOpen(data: Object): void {
    let json = JSON.parse(JSON.stringify(data))
    this.model = new UserDTO(data)
    this.model.role = this.getIndexOf(json.role, this.roles)
  }

  preNewOpen(): void {
    this.model = new UserDTO()
  }

  preSubmit(data: any): any {
    data.role = this.roles[data.role]
    return data
  }
}
