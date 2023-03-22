import DiiaCell from "./diiaCell.js";

class FunctionCell extends DiiaCell {
  /**
   * @param {Mavka} mavka
   * @param {Context} context
   * @param {FunctionNode} node
   */
  constructor(mavka, context, node) {
    super(mavka, context, node);

    this.contextClass = this.mavka.LightContext;
  }
}

export default FunctionCell;
