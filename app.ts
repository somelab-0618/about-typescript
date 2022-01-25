// ## ジェネリック型 追加の型情報を提供できる型
const names: Array<string> = []; // string[] と同義

// promiseが最終的にstring型を返す
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve('完了');
  }, 2000);
});

// ## Generic関数

// 通常
function merge(objectA: object, objectB: object) {
  return Object.assign(objectA, objectB);
}

const mergedObj = merge({ name: 'taro' }, { age: 30 });
// mergedObj.age; // mergedObjはobjectということしかわからないのでエラーになっている

console.log();
// ↓
// ジェネリック関数
// ** TとUは「異なる型が渡される」ということのみ伝えていて、実際の型は実行時に動的にきまる。 **
// extendsでTやUに制約をつけることができる
function merge2<T extends object, U extends object>(objectA: T, objectB: U) {
  return Object.assign(objectA, objectB);
}
// (type parameter) U in merge2<T, U>(objectA: T, objectB: U): T & U
// TとUの交差型を返すことがわかるようになる

// 型推論
// const mergedObj2: {
//   name: string;
// } & {
//     age: number;
// }
const mergedObj2 = merge2({ name: 'taro' }, { age: 30 });
mergedObj2.age; // mergedObjはobjectということしかわからないのでエラーになっている

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = '値がありません';
  if (element.length > 0) {
    descriptionText = '値は' + element.length + '個です。';
  }
  return [element, descriptionText];
}

// # keyof制約
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'max' }, 'name');

// ジェネリッククラス
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Data1');
textStorage.addItem('Data2');
textStorage.removeItem('Data2');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());
