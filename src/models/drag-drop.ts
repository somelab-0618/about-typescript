// namespaceにはconstやclassなど何でも入るが、
// namespaceの中でしか使えないのでexportが必要
namespace App {
  // namespaceに入れたものは
  // オブジェクトのプロパティの値として保持される
  // Drag & Drop
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }
  export interface DragTarget {
    // Dragしている場所がDropが有効な場所かどうかを判定
    dragOverHandler(event: DragEvent): void;
    // Dropが起きたときに呼ばれる
    dropHandler(event: DragEvent): void;
    // Dragして元の要素を離れたときに呼ばれる
    dragLeaveHandler(event: DragEvent): void;
  }
}
