import searchWidthNode from '../searchWithNode'

const e:any = expect

function sum(a:any, b:any) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  e(sum(1, 2)).toBe(3)
});