# 業務系システムエンジニアのためのjQuery入門

業務Webアプリケーションを想定した、実務で使うためのjQueryハンズオン。

jQueryの基礎を学びながら静的HTMLファイルを、jQueryを使って動的なWebアプリケーションにしていきます。

（注意）
本、カリキュラムはjQueryの基本的な使い方を学習ためのものであり、jQueryで業務システムを構築するためのものではありません。jQueryはフレームワークではなく、単なるライブラリです。jQueryのみで大規模なWebアプリケーションを構築した場合、コードがスパゲテリ化しやすく、メンテナンス時に泣くことになります（経験談）。大規模なWebアプリケーションを構築するためには、別途クライアントMVCフレームワークを導入し、javascriptのロジックを構造化することを推奨します。


### 使用ライブラリ

jQuery, underscore.js, bootstrap3

### 目次

 1. jQuery基礎 
  2. jQueryの基本的な使い方
  3. セレクタ・要素の選択
 4. 画面周りのアニメーションとインタラクション
  5. スライダー
  5. プルダウンの連動（Ajax）
 4. 検索機能の実装
  6. 検索ボタンクリック
  7. 検索実施（Ajax）
  8. 結果を一覧表示
 9. 詳細ダイアログの実装
  10. 詳細ボタンクリック
  11. 詳細画面表示
  12. 詳細画面クローズ時のコールバック処理
 9. 登録機能の実装
  10. 登録ボタンクリック
  11. 確認ダイアログの表示
  12. 入力チェック
  13. 登録実施（Ajax）
  14. 結果の表示


## 1. jQuery基礎

### 1.1 jQueryの基本的な使い方

jQueryを呼び出すにはjQuery本体をダウンロードして以下の用に`<head>`の中に`<script>`を入れます。

````
<head>

  // 省略
  <script src="assets/js/jquery-1.10.2.min.js"></script>
  // カスタムjavascript
  <script src="js/main.js"></script>
  
</head>
````

世の中的には、`</body>`の前に入れることがパフォーマンス的にメリットがあるので推奨されていますが、業務系システムは画面の表示が多いこともあり、DOM構築に時間が掛かる場合があります。

`</body>`直前にてjavascriptを読み込ませた場合、javascriptの実行が完了する前に、リンクやボタンなどを利用者が押してしまい。予期せぬデータが設定されたリクエストが送信される場合がありますので、`<head>`の中にて**async**や**defer**を使ってロードした方がいいと思います。

早速、jQueryを使ってみます。`main.js`の中に以下のように関数スコープを作ります。
````
$(function(){
  //ここに処理を書きます。

});
````

`$`はjQueryのショートハンドで`jQuery`でも代用できます。jQueryの基本的なI/Fは次のようなgetterとsetter形式です。

````
//Getter
$('セレクタ').処理(’プロパティ名’);

//例）
$('#id').data('propertyName');
$('.class').text();

//Setter
$('セレクタ').処理('プロパティ名', '値');

//例)
$('#id').data('propertyName', value);
$('.class').text('message....');

````

最後の引数には、処理が終わった後のコールバック関数が設定されることが多いです。

````
//クリックイベントハンドラ
$('.class').on('click', function(e){ ... });

//forEach
$('[data-attribute]').each(function(index, value){ ... });

````

jQueryの関数は`.（ピリオド）`で連結できるものがあります。これを**チェーン**と呼びます。

````
$('.class').find('.target').text();
````

### 1.2 セレクタ・要素の選択

jQueryでよく使うセレクタは以下の通りです。上からパフォーマンスが速いとされています。

````
//ID
//<div id="hoge"></div>
$('#hoge')

//Class名
//<div class="hoge"></div>
$('.hoge')

//カスタム属性
//<div data-hoge=""></div>
$('[data-hoge]')

//カスタム属性の値一致
//<div data-hoge="foo"></div>
$('[data-hoge="foo"]')
````

jQueryでよく使う要素の検索方法です。`find`, `filter`, `children`, `closest`, `sibling`

````
//find
//$('#hoge')以下から要素を探します。
$('#hoge').find('.foo')

//filter
//$('#hoge')でマッチしたものをフィルタリングします。
$('#hoge').filter('.foo')

//children
//$('#hoge')の１階層下から要素を探します
$('#hoge').children('.foo')

//closest
//$('#hoge')からDOMノードを遡って要素を探します。一番はじめに見つかった要素を返します。一致するすべての要素を列挙したい場合は`parents`を使います。
$('#hoge').closest('.foo')

//sibling
//$('#hoge')と同じ階層の中から要素を探します
$('#hoge').sibling('.foo')
````

複合セレクタでも同じことが出来ますが、パフォーマンス的に推奨されません。

````
//Bad
$('#hoge .foo')

//Good
$('#hoge').find('.foo')
````

## 2. 画面周りのアニメーションとインタラクション

### 2.1 スライダー

まず、簡単なスライダーを実装してみましょう。
`main.js`に以下のようにクリックイベントハンドラを作ります。

````
$('.js-btn-slide').on('click', function(e){
  alert('hello');
};
````
⬆️ボタンをクリックしたときにアラートが表示されると思います。

次に実際にコンテンツエリアをスライドさせて行きます。ついでに、ボタンのラベルも変化するようにしましょう。

````
$('.js-btn-slide').on('click', function(e){
  //スライドさせるコンテンツエリアを取得
  var $createArea = $('.js-create-inner');
  //ボタンをfindして取得
  //イベントハンドラの場合、コンテキスト（this）はクリックしたボタンとなる
  var $slideButton = $(this).find('.glyphicon');
  //コンテンツエリアが表示されているかどうかで処理を分岐
  if($createArea.is(':visible')){
    $createArea.slideUp(300);
  }else{
    $createArea.slideDown(300);
  }
  //ボタンのラベルはスタイルクラスを変えることで変化させている
  //別に、普通のテキストでもいい。
  $slideButton.toggleClass('glyphicon-chevron-up')
    .toggleClass('glyphicon-chevron-down');
};
````

これで、スライダーが完成しました。

### 2.2 プルダウンの連動（Ajax）

大分類、小分類プルダウンを想定した、プルダウン間の連動を作っていきます。途中、Ajax通信を行います。まず、イベントハンドラを作って動作確認してみましょう。大分類の選択状態を変更した場合にアラートが出るはずです。

````
$('.js-largeBunrui').on('change', function() {
  alert('hoge');
};
````

次に、大分類プルダウンの値を取得して、Ajax通信を行いサーバ側へ中分類の問い合わせを行います。まず焦らず、Ajax通信が正常終了した場合にアラートを表示させます。

````
$('.js-largeBunrui').on('change', function() {
  //大分類
  var $largeBunrui = $(this);
  //大分類の選択値を取得してAjaxパラメータとして設定する
  var selectionValue = $largeBunrui.val();
  var data = {
    largeBunrui: selectionValue
  }
  //大分類が選択されている場合のみ、Ajax通信を行うこと
  if (selectionValue) {
    //Ajax通信
    //$.getJSON(URL, パラメータ, コールバック関数)
    $.getJSON('/api/midBunrui', data, function(data) {
      alert(data);
    });
  }
};
````
では、Ajax通信のレスポンスを元に中分類プルダウンを再作成していきます。
````
$('.js-largeBunrui').on('change', function() {
  //大分類
  var $largeBunrui = $(this);
  //大分類の選択値を取得してAjaxパラメータとして設定する
  var selectionValue = $largeBunrui.val();
  var data = {
    largeBunrui: selectionValue
  }
  //中分類をクリア
  var $midBunrui = $('.js-midBunrui');
  $midBunrui.children().remove();
  //大分類が選択されている場合のみ、Ajax通信を行うこと
  if (selectionValue) {
    //Ajax通信
    //$.getJSON(URL, パラメータ, コールバック関数)
    $.getJSON('/api/midBunrui', data, function(data) {
      var $option;
      //戻ってきたJSONの配列をループしてセレクトボックスを再作成
      $.each(data, function(index, value) {
        //oprionタグを生成して追加
        $option = $('<option/>').val(value.key).text(value.value);
        //中分類に追加
        $midBunrui.append($option);
        });
    });
  }
};
````
これでプルダウンの連動が完成しました。

## 3. 検索機能の実装 

ここからは、検索機能を作っていきます。

### 3.1 検索ボタンクリック

いままでと同じように、検索ボタンをクリックした場合のイベントハンドラを定義して、動作確認していきます。

````
$('.js-btn-search').on('click', function(e) {
  alert('hoge');
};
````

### 3.2 検索実施（Ajax）

次に、検索条件を取得してAjax通信を行います。まず、Ajax通信が正常終了した場合にアラートで検索結果を表示させます。

````
$('.js-btn-search').on('click', function(e) {
  var formData, inputData = {};
  //検索条件を配列にシリアライズ
  formData = $('.js-search-form').serializeArray();
  //Ajaxパラメータ用に整形
  $.each(formData, function(index, data) {
    inputData[data.name] = data.value;
  });
  //Ajax通信
  $.getJSON('/api/search', inputData, function(data) { 
  	//検索結果がある場合のみ結果をアラートを表示
	if (data && data.results) {
	  alert(data.results);
	}else{
	  alert('データがありませんでした。')
	}
  });
};
````

### 3.3 結果を一覧表示

では、Ajaxにて結果が取得できら、結果を表示させていきましょう。



