import {SuperModel} from "../../_helpers/SuperModel";

export class ReservationDTO extends SuperModel {

  public user?: number
  public vehicle?: number
  public placeOfDelegation?: string
  public startOfDelegation?: string
  public endOfDelegation?: string

  constructor(dto?: Partial<ReservationDTO>) {
    super(dto)
    if (dto) {
      this.user = dto.user
      this.vehicle = dto.vehicle
      this.placeOfDelegation = dto.placeOfDelegation
      this.startOfDelegation = dto.startOfDelegation
      this.endOfDelegation = dto.endOfDelegation
    }
  }
}
