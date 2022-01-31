// ↓トリプルスラッシュディレクティブ インポートするファイルのパスを記述する
// ↓ファイルの依存関係を示している
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />

// 依存するファイルと同じ名前空間で囲むとプレフィックスなしで、読み込んだファイルの
// 中身を使える
namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
