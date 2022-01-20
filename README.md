# simple-typescript-env
学習用TypeScritpt実行環境

# 使用方法

1. node modulesのインストール

ルートディレクトリで下記コマンド実行

```
$ npm install
```
TypeScriptとlite-serverがインストールされます。

2. Typsecript のコンパイル実行例

```
$ npx tsc app.ts
```

3. lite-serverの使用
ホットリロードに対応した、簡易開発サーバーです。

npm scriptで
```
$ npm start
```

npxで
```
$ npx lite-server
```

自動的にブラウザが開きます。
以下のようにコマンド実行後にアクセスURLが表示されます。

```
[Browsersync] Access URLs:
 -------------------------------------
       Local: http://localhost:3000  <= このURLでアクセスできる。
    External: http://192.168.11.3:3000
 -------------------------------------
          UI: http://localhost:3003
 UI External: http://localhost:3003
 -------------------------------------
```

終了は `Ctrl + C` です。

