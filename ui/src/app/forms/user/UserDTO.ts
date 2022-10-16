import {SuperModel} from "../../_helpers/SuperModel";

export class UserDTO extends SuperModel {

  public username?: string
  public email?: string
  public fullName?: string
  public idCardNumber?: string
  public birthDate?: string
  public password?: string
  public password1?: string
  public password2?: string
  public role?: number

  constructor(dto?: Partial<UserDTO>) {
    super(dto)
    if (dto) {
      this.username = dto.username
      this.email = dto.email
      this.fullName = dto.fullName
      this.idCardNumber = dto.idCardNumber
      this.birthDate = dto.birthDate
      this.password1 = dto.password1
      this.password2 = dto.password2
    }
  }
}
