import { Cell } from "./cell.js";

class StructureCell extends Cell {
  /**
   * @param {Mavka} mavka
   * @param {string} name
   * @param {Record<string, Cell>} properties
   * @param {StructureCell|null} parent
   * @param {{ name: string, defaultValue: Cell|undefined }[]} parameters
   * @param {Record<string, Method>} methods
   */
  constructor(mavka,
              name,
              properties = {},
              parent = null,
              parameters = [],
              methods = {}) {
    super(mavka, name, properties, null);

    this.parent = parent;
    this.parameters = parameters;
    this.methods = methods;
  }

  getAllParameters() {
    let parameters = [];
    if (this.parent) {
      for (const pp of this.parent.getAllParameters().reverse()) {
        if (this.parameters.find((p) => p.name === pp.name)) {
          continue;
        }

        parameters = [pp, ...parameters];
      }
    }
    parameters = [...parameters, ...this.parameters];
    return parameters;
  }

  hasMethod(name) {
    return name in this.getAllMethods();
  }

  getMethod(name) {
    return this.getAllMethods()[name];
  }

  setMethod(name, fn) {
    this.methods[name] = this.mavka.makeMethod(name, fn);
  }

  getAllMethods() {
    let methods = this.methods;
    if (this.parent) {
      methods = { ...this.parent.getAllMethods(), ...methods };
    }
    return methods;
  }

  asText(context) {
    return this.mavka.toCell(`<структура ${this.name}>`);
  }
}

export default StructureCell;
