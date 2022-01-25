// class デコレーター  クラスが定義を見つけた時に実行される
// デコレーターにする関数は大文字始まりが慣習
function Logger(constructor: Function) {
  // 引数はデコレーターの対象となるものを受け取る
  // classデコレーターは一つの引数
  console.log('ログ出力中...');
  console.log(constructor);
}

// デコレーターの指定
@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();

console.log(pers);
