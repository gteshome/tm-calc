// Unit tests
describe("Simple Calculator", function() {
    var calc = require('../calc');
  
    it("Should return 7", function() {
      expect(calc.addNumbers(4,3)).toEqual(7);
    });
  
    it("Should return -5", function() {
      expect(calc.subNumbers(2,7)).toEqual(-5);
    });
  
    it("Should return 12", function() {
      expect(calc.divNumbers(36,3)).toEqual(12);
    });
  
    it("Should return 10", function() {
      expect(calc.ranNumbers()).toHaveSize(10);
    });
  
    it("Should return 15", function() {
      expect(calc.ranNumbers(15)).toHaveSize(15);
    });
});