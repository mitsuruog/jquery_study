console.log('\'Allo \'Allo!');

$(function() {

	//検索結果用テンプレート
	var template = _.template($('#tmpl-row').html());

	$('.js-btn-slide').on('click', function(e){

		var $createArea = $('.js-create-inner');
		var $slideButton = $(this).find('.glyphicon');

		if($createArea.is(':visible')){
			$createArea.slideUp(300);
		}else{
			$createArea.slideDown(300);
		} 

		$slideButton.toggleClass('glyphicon-chevron-up')
			.toggleClass('glyphicon-chevron-down');

	});

	$('.js-btn-search').on('click', function(e) {

		var formData, inputData = {};
		var $tableBody = $('.table-body');

		//検索結果を削除
		$tableBody.children().remove();

		//
		formData = $('.js-search-form').serializeArray();
		$.each(formData, function(index, data) {
			inputData[data.name] = data.value;
		});

		//
		$.getJSON('/api/search', inputData, function(data) {

			//
			if (data && data.results) {

				$.each(data.results, function(index, user) {

					user.index = index + 1;
					$tableBody.append(template(user));

				});

			} else {

				$.event.trigger('show.message.error', 'データがありませんでした。');
			
			}

		});

	});

	$('.js-btn-create').on('click', function(e) {

		e.preventDefault();

		if (!confirm('登録してもよろしいですか？')) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		}

		var formData, inputData = {};
		var $tableBody = $('.table-body');

		//
		formData = $('.js-create-form').serializeArray();
		$.each(formData, function(index, data) {
			inputData[data.name] = data.value;
		});

		//
		$.ajax({
			url: '/api/create',
			type: 'POST',
			dataType: 'json',
			data: inputData
		})
				.done(function(data) {

				//
				if (data) {

					$.event.trigger('show.message.success', '登録しました。');

				} else {

					$.event.trigger('show.message.error', '登録に失敗しました。');

				}

			});

	});


	/**
	 * 大分類、小分類連動セレクトボックス
	 *
	 */
	$('.js-largeBunrui').on('change', function() {

		var $largeBunrui = $(this);
		var $midBunrui = $('.js-midBunrui');

		//大分類の選択値を取得してAjaxパラメータとして設定する
		var selectionValue = $largeBunrui.val();
		var data = {
			largeBunrui: selectionValue
		}

		//中分類をクリア
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
					$midBunrui.append($option);

				});

			});

		}

	});

	/**
	 *
	 * グローバルイベント
	 *
	 */
	var $alert = $('.js-alert');

	$(document).on('show.message.success', function(e, message) {

		$alert.text(message)
			.removeClass('alert-danger')
			.addClass('alert-success')
			.show('slow');

	});

	$(document).on('show.message.error', function(e, message) {

		$alert.text(message)
			.removeClass('alert-success')
			.addClass('alert-danger')
			.show('slow');

	});

});