import {FieldType} from "./FieldType";

export class Column {

  private title : string
  private className : string
  private data : string
  private searchField : string
  private visible : boolean
  private _render: any

  constructor() {
    this.title = ""
    this.data = ""
    this.className = ""
    this.searchField = ""
    this.visible = true
  }

  setTitle(title:string) : Column {
    this.title = title
    return this
  }

  setData(data:string) : Column {
    this.data = "_"+data
    return this
  }

  setClassName(name:string) : Column {
    this.className = name
    return this
  }

  setFilterField(type : FieldType) : Column {
    this.searchField = FieldType[type].toLowerCase()
    return this;
  }

  setRenderer(func: any): Column {
    this._render = func
    return this;
  }

  hidden(): Column {
    this.visible = false
    return this;
  }

  get render(): any {
    return this._render;
  }
}
