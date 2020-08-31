// Functions
module.exports = {
  addNumbers: function(num1,num2) {
    return num1 + num2;
  },
  subNumbers: function(num1,num2) {
    return num1 - num2;
  },
  divNumbers: function(num1,num2) {
    return num1 / num2;
  },
  ranNumbers: function(num) {
    let random_nums = new Array();
    count = 10;

    if (num) {
      count = num;
    }

    for (let v = 0; v < count; v++) {
      num = Math.floor(Math.random() * 1000);
      random_nums.push(num);
    }

    return random_nums;
  
  }
}