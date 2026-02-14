const { expect } = require("chai");
const { calculateSalary } = require("../src/salary");

describe("Salary Calculation Test", () => {

  it("should calculate total salary with bonus", () => {
    const total = calculateSalary(20000, 5000);
    expect(total).to.equal(25000);
  });

  it("should calculate salary when bonus is zero", () => {
    const total = calculateSalary(20000, 0);
    expect(total).to.equal(20000);
  });

});
