export class SuperModel {
  public id?: number
  public version?: number
  public createdBy?: string
  public creationDate?: string
  public lastUpdateDate?: string
  public lastUpdatedBy?: string

  constructor(dto?: Partial<SuperModel>) {
    if (dto) {
      this.id = dto.id
      this.version = dto.version
      this.createdBy = dto.createdBy
      this.creationDate = dto.creationDate
      this.lastUpdateDate = dto.lastUpdateDate
      this.lastUpdatedBy = dto.lastUpdatedBy
    }
  }
}
