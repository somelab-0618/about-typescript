// デコレーターファクトリー
// 引数をカスタマイズできる
function Logger(logString: string) {
  console.log('Logger ファクトリ');
  // デコレーターで実行したい処理
  return function (constructor: Function) {
    console.log('ログ出力中...');
    console.log(constructor);
  };
}

// 便利なデコレータ
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE ファクトリ');
  // constructorを引数として受け取っても、使わない場合は「_」に置き換えることができる
  return function (constructor: any) {
    console.log('テンプレートを表示');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name; // オブジェクトを使うなども可能
    }
  };
}

// デコレーターの指定
// @Logger('ログ出力中 - PERSON') // デコレーターから返される関数を実行

// 複数のデコレータも使用可能
// デコレータ関数は上から作成されるが、それらの実行は下から上に実行される
@Logger('ログ出力')
@WithTemplate('<h1>Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Personオブジェクトを作成中...');
  }
}

const pers = new Person();

console.log(pers);
