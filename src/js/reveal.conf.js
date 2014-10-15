/*global window,Reveal*/
(function (window, $, reveal) {
	'use strict';

	$(function () {

		var isMobile = navigator.userAgent.match(/(iphone|android)/gi);
		var appPath = $('.back').data('app') || '../';
		var backPath = $('.back').data('back') || './';
		
		reveal.initialize({

			controls: true,

			progress: true,

			history: true,

			center: true,
			
			theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
			transition: isMobile ? 'linear' : 'default', // default/cube/page/concave/zoom/linear/fade/none
			
			math: {
				config: 'TeX-AMS_HTML-full',
				mathjax: appPath + 'app/bower_components/MathJax/MathJax.js'
			},
			// Optional libraries used to extend on reveal.js
			dependencies: [
				{ src: [
					'http://www.mathjax.org/wp-content/plugins/syntax-highlighter-mt/scripts/shCore.js',
					'http://www.mathjax.org/wp-content/plugins/syntax-highlighter-mt/scripts/shAutoloader.js',
					'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
					],
					async: true
				}
				// { src: appPath + 'app/bower_components/reveal.js/plugin/math/math.js', async: true }
			]
		});

		reveal.configure({
			keyboard: {
				27: function() {
					window.location.href = backPath;
				} // do something custom when ESC is pressed
			}
		});

		if(!navigator.userAgent.match(/(iphone|android)/gi) && !!document.querySelector) {

			var isPrint = window.location.search.match( /print-pdf/gi );
			var location = window.location;
			var backButton = $('<button>').addClass('btn btn-mini back').text('Indice Lezioni')[0];
			var printButton = $('<button>').addClass('btn btn-mini print').text('Stampa Slide')[0];

			$('.share-reveal' ).css('display', 'block');

			$('.share-reveal.reveal-back').append(backButton)
				.append('&nbsp;')
				.append(printButton);

			$('.back').on('click', function () {
				window.location.href = backPath;
			});

			$('.print').on('click', function () {

				location.replace(location.href.replace(/#\//,'?print-pdf#/'));
			});

			if(isPrint) {
				var cssPath = appPath + '/app/bower_components/reveal.js/css/print/pdf.css';

				$.get(cssPath, function (data) {
					if (!$('#print-pdf').length) {
						$('head').append('<style id="print-pdf" type="text/css" media="print"></style>');
					}
				}).success(function (data) {
					$('#print-pdf').html(data)
				}).then(function () {
					// TODO I should remove setTimeout
					window.setTimeout(function () {
						window.print();
						location.replace(location.href.replace('?print-pdf#/','#/'));
					}, 2000);
				});
			}
		}

	});

}(window, jQuery, Reveal));
