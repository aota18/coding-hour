const {testID,testEmail} = require('./UnitFunction'); 




test('new Id: wow123 to be true', () => {
  expect(testID('wow123')).toBe(true);
});
test('new Id: @#$% to be false', () => {
  expect(testID("@#$%")).toBeFalsy();
});


test('Test Email: 21500692@handong.edu', () => {
  expect(testEmail("21500692@handong.edu")).toBe(true);
});

test('Test Email: abs324@naver.com', () => {
  expect(testEmail("abs324@naver.com")).toBe(false);
});

test('Test Email: abs3212', () => {
  expect(testEmail("abs3212")).toBe(false);
});