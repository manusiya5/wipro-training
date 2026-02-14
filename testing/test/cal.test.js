const { expect } = require("chai");
const calculator = require("../src/cal");

describe("Calculator Unit Tests", () => {

  describe("Addition", () => {
    it("should add two numbers correctly", () => {
      const result = calculator.add(3, 3);
      expect(result).to.equal(6);
    });
  });

  describe("Subtraction", () => {
    it("should subtract two numbers correctly", () => {
      const result = calculator.subtract(3, 3);
      expect(result).to.equal(0);
    });
  });

  describe("Multiplication", () => {
    it("should multiply two numbers correctly", () => {
      const result = calculator.multiply(3, 3);
      expect(result).to.equal(9);
    });
  });

  describe("Division", () => {
    it("should divide two numbers correctly", () => {
      const result = calculator.divide(20, 5);
      expect(result).to.equal(4);
    });

    it("should throw error when dividing by zero", () => {
      expect(() => calculator.divide(10, 0)).to.throw("Cannot divide by zero");
    });
  });

});