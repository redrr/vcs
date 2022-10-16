import {SuperModel} from "../../_helpers/SuperModel";

export class VehicleDTO extends SuperModel {

  public licensePlateNumber?: string
  public manufacturer?: string
  public type?: string
  public chassisNumber?: string
  public responsibleUser?: number
  public color?: string

  constructor(dto?: Partial<VehicleDTO>) {
    super(dto)
    if (dto) {
      this.licensePlateNumber = dto.licensePlateNumber
      this.manufacturer = dto.manufacturer
      this.type = dto.type
      this.chassisNumber = dto.chassisNumber
      this.color = dto.color
    }
  }
}
