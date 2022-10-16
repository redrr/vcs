import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CrudService} from "../_services/crud.service";
import {FormConfig} from "./form/FormConfig";

@Component({
  selector: 'form-ui-builder',
  template: ``
})
export abstract class FormUIBuilder implements OnInit {

  cfg: FormConfig;

  constructor(public modalService: NgbModal, public crudService: CrudService) {
    this.cfg = this.formConfig(new FormConfig())
  }

  abstract formConfig(cfg: FormConfig) : FormConfig

  abstract ngOnInit(): void;

  abstract preEditOpen(data: Object): void

  abstract preNewOpen(): void

  abstract preSubmit(data: any): any

  open(data?: any) {
    $(this.cfg.selector).attr("data", data ? data._id : "").trigger('click')
  }

  openForm(content: any) {
    this.modalService.open(content).shown.subscribe(() => {
      let data = $(this.cfg.selector).attr("data")
      if (data) {
        this.crudService.findById(this.cfg.service, JSON.parse(data)).subscribe(resp => {
          this.preEditOpen(resp)
        })
      } else {
        this.preNewOpen()
      }
    })
  }

  getIndexOf(data: any, arr: any[]): number {
    return arr.findIndex(e => e.id === data.id).valueOf()
  }

  onClickSubmit(data: any) {
    this.crudService.save(this.cfg.service, this.preSubmit(data))
  }
}
