import {Button} from "./Button";

export class VisibilityButton extends Button {

  private columns : string;
  private attr : any;

  constructor() {
    super();
    this.columns = ":not(.none):not(.notexport)";
    this.attr = {
      id: 'colvisButton',
      'data-toggle': 'dropdown',
      bShowAll: true,
      bCssPosition: 'relative'
    };
  }
}
