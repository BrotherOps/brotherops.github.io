//alert('ok')
$(window).on('load', function () {
	// loader //
	$("#loadtxt1").removeClass("loadOK").delay(1500).queue(function(next) {
		$(this).addClass("loadOK").delay(500).queue(function(next2) {
			$("#loadtxt2 span").css('color','#00b646');
			$("#loadtxt1").animate({
				marginLeft: '5.05vw'
			}, 500);
			$("#loadtxt2").animate({
				marginLeft: '10vw'
			}, 500);
			next2();
		});
		next();
	});
  $("#load").ready(function() {
		$("#progress").animate({
			width: '20%'
		}, 500);
		$("#progress2").animate({
			width: '20%'
		}, 500);
	});
	$("#sidebar").ready(function() {
		$("#progress").animate({
			width: '75%'
		}, 500);
		$("#progress2").animate({
			width: '75%'
		}, 500);
	});
	$("#main-wrapper").ready(function() {
		$("#progress").animate({
			width: '100%'
		}, 500);
		$("#progress2").animate({
			width: '100%'
		}, 500);
		$("#load").delay(3000).fadeOut(200);
	});
	// loader //
});
