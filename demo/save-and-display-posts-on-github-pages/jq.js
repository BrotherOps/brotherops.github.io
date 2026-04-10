$(document).ready(function () {
	$(document).on('click', '.categoryBtn', function () {
		var what = $(this).data("what");
		$('.categoryBtn').removeClass('active');
		$(this).addClass('active');
		document.getElementById("posts").innerHTML = "";
		fetch('posts.json?v=1')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				if (what == 'all') {
					appendItem(data["dogs"]);
					appendItem(data["cats"]);
				} else if (what == 'dogs') {
					appendItem(data["dogs"]);
				} else if (what == 'cats') {
					appendItem(data["cats"]);
				}
			})
			.catch(function (err) {
				console.log('error: ' + err);
			}).then(function () {
				var $wrapper = $('#posts');
				$wrapper.find('.aPost').sort(function (a, b) {
					return +b.dataset.order - +a.dataset.order;
				}).appendTo($wrapper);
			});
	});
	$('#showArea').on('click', function () {
		alert('Output has been copied, you can now paste.');
		$(this).select();
		document.execCommand('copy');
	});	
	$('#show').on('click', function () {
		var unix = Date.now();
		var title = $('#title').val();
		var URLid = $('#URLid').val();
		var postedOn = $('#postedOn').val();
		var author = $('#author').val();
		var category = $('#category').val();
		var imgURL = $('#imgURL').val();
		var content = $('#content').val();
		/* note: \n = new line the \ after = Multiple lines to preserve nice json output https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unterminated_string_literal#multiple_lines */
		var addJSON = '{\n \	"itemId":"'+ unix + '",\n \	"URLid":"'+ URLid + '",\n \	"title":"'+ title + '",\n \	"postedOn":"'+ postedOn + '",\n \	"author":"'+ author + '",\n \	"lastEdit":"-",\n\	"category":"'+ category + '",\n \	"imgURL":"'+ imgURL + '",\n \	"content":"'+ content + '"\n},';
		$('#showArea').val(addJSON);
		$('#showArea').css('display', 'block')
	});
	$('#test').on('click', function () {
		var unix = Date.now();
		var title = $('#title').val();
		var URLid = $('#URLid').val();
		var postedOn = $('#postedOn').val();
		var author = $('#author').val();
		var category = $('#category').val();
		var imgURL = $('#imgURL').val();
		var content = $('#content').val();
		var mainContainer = document.getElementById("testDiv");
		mainContainer.innerHTML = '<a name="' + URLid + '" class="anchor"></a><h1 class="CSitem"><a href="#' + URLid + '">' + title + '</a></h1><small><span class="midgray">Posted</span> ' + postedOn + ' &emsp; <span class="midgray">Author</span> ' + author + ' &emsp; <span class="midgray">Last edit</span> - &emsp; <span class="midgray">Category</span> ' + category + '</small><hr style="border:0;margin-top:0.5vh;background:#00b646;height:4px;margin-top:1.5vh;" /> <img src="' + imgURL + '" style="float:left;height:9vw;margin-right:0.5vw;" alt="" />' + content + '<br><div class="clear"></div><hr style="margin-bottom:7vh;"/>';
	});
});

fetch('posts.json?v=1.0.1')
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		appendItem(data["dogs"]);
		appendItem(data["cats"]);
	})
	.catch(function (err) {
		console.log('error: ' + err);
	}).then(function () {
		var $wrapper = $('#posts');
		$wrapper.find('.aPost').sort(function (a, b) {
			return +b.dataset.order - +a.dataset.order;
		}).appendTo($wrapper);
	});
function appendItem(data) {
	var mainContainer = document.getElementById("posts");
	for (var i = 0; i < data.length; i++) {
		var div = document.createElement("div");
		div.className = "aPost";
		div.dataset.order = data[i].itemId;
		div.innerHTML = '<a name="' + data[i].URLid + '" class="anchor"></a><h1 class="CSitem"><a href="#' + data[i].URLid + '">' + data[i].title + '</a></h1><small><span class="midgray">Posted</span> ' + data[i].postedOn + ' &emsp;&emsp; <span class="midgray">Author</span> ' + data[i].author + ' &emsp;&emsp; <span class="midgray">Last edit</span> ' + data[i].lastEdit + ' &emsp;&emsp; <span class="midgray">Category</span> ' + data[i].category + '</small><hr style="border:0;margin-top:0.5vh;background:#00b646;height:4px;margin-top:1.5vh;" /><img src="' + data[i].imgURL +'" style="float:left;height:9vw;margin-right:0.5vw;" alt="" />' + data[i].content + '<br><hr style="margin-bottom:7vh;"/>';
		mainContainer.appendChild(div);
	}
}
