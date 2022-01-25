// オブジェクトの定義
interface Person1 {
  name: string;
  age: number;
  greet(phrase: string): void;
}

let user1: Person1;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user1.greet;

// interface と typeの違い
// interfaceはobjectの型のみを定義できる
// classのinterfaceを実装できる
interface Named {
  readonly name: string; // 初期化以降readonlyにする
  outputName?: string; // ? であってもなくてもOK
}

// Named interfaceの継承
interface Greetable extends Named {
  greet(phrase: string): void;
}

// interfaceは複数指定できる
// interfaceの型通りに実装されていなくてはならない
// interfaceは実装を持たない ⇔ abstract classはabstractも実装も混在している
class Person implements Greetable {
  name: string; // <= interfaceでreadonlyになっていると、ここも自動的にreadonlyとなる
  age = 30; // interfaceにないものの実装も可能

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

let user2: Greetable;
user2 = new Person('Max');
user2.greet('Hello I am');

// 関数型としてのinterface

// Function型
// type AddFn = (a: number, b: number) => number;

//interfaceでの関数の型の定義
interface AddFn {
  (a: number, B: number): number;
}

let addNumber: AddFn;

addNumber = (n1: number, n2: number) => {
  return n1 + n2;
};
