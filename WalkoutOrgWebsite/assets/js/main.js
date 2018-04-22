/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
var config = {
	apiKey: "AIzaSyBV4bkE1F93KM0gyeKfMve1BzES8WC1moo",
	authDomain: "walkoutorrrg.firebaseapp.com",
	databaseURL: "https://walkoutorrrg.firebaseio.com",
	projectId: "walkoutorrrg",
	storageBucket: "",
	messagingSenderId: "832751515426"
};
var w = 0;
firebase.initializeApp(config);
(function($) {

	"use strict";

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Menu.
			var $menu = $('#menu');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {

					event.stopPropagation();

					// Hide.
						$menu._hide();

				})
				.find('.inner')
					.on('click', '.close', function(event) {

						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();

						// Hide.
							$menu._hide();

					})
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('click', 'a', function(event) {

						var href = $(this).attr('href');

						event.preventDefault();
						event.stopPropagation();

						// Hide.
							$menu._hide();

						// Redirect.
							window.setTimeout(function() {
								window.location.href = href;
							}, 350);

					});

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

	});

})(jQuery);

function t(admin) {
	console.log("woof");
	var database = firebase.database();
	var names = [];
	var woo = 0;
	var descriptions = [];
	var addresses = [];
	var dates = [];
			database.ref().on("value", function(snapshot){
				//console.log(snapshot);
				//names.push(snapshot.child("one").child("Name").val());
				//descriptions.push(snapshot.child("one").child("Description").val());
				snapshot.forEach(function(childSnapshot){
					//if(childs.indexOf(childSnapshot.child("message").val()) == -1){
					childSnapshot.forEach(function(wSnapshot){

						console.log(wSnapshot.child("text").val());
						names.push(wSnapshot.child("Name").val());
						descriptions.push(wSnapshot.child("Description").val());
						addresses.push(wSnapshot.child("Address").val());
						dates.push(wSnapshot.child("Date").val());

					});
						woo++;

					//}
	  		});
			});
			//console.log(names[0]);
			//console.log(descriptions[0]);
			console.log(descriptions);
			console.log(names);
			console.log(woo);
			for(var i =0;i<names.length;i++){
	if(names[0] != null && w <2){
		createCard(names[i],descriptions[i],admin);
	}
 }
 w++;
}

function onclickSubmission(){
	var nameOf = document.getElementById('name_of_event').value;
	var description = document.getElementById('description_of_event').value;
	var addressOf = document.getElementById('Address_of_event').value;
	var date = document.getElementById('Date').value;
	var jsonMap;
	var image;
	var messageListRef = firebase.database().ref('m');
	var newMessageRef = messageListRef.push();
	newMessageRef.set({
  'Name': nameOf,
  'Description': description,
	'Address' : addressOf,
	'Date' : date
});

	console.log(nameOf+" "+description+" "+addressOf);

}
function createMap(){
	var addressOf = document.getElementById('Address_of_event').value;

}

function handlebrowse(name){
	alert("you are signed up for event")
}

function createCard(name,description,admin){
	if(name == null)name = "Walkout";
	if(description == null)description = "description";
	var dynamicContent = name;
	var link = "protestScreen.html?dc="+dynamicContent;
	var funct = "handlebrowse(name);";
	if(admin == true)var finalString = "<article> <a href='#' class='image'><img src='images/pic04.jpg' alt='' /></a><h3 class='major'>"+name+"</h3> <p>"+description+"</p> <a href= " + link + " class='special'>Learn more</a></article>";
	if(admin == false)var finalString = "<article> <a href='#' class='image'><img src='images/pic04.jpg' alt='' /></a><h3 class='major'>"+name+"</h3> <p>"+description+"</p> <button onclick='" + funct + "' class='special'>Learn more</button></article>";
	console.log(admin);
	var fragment = create(finalString);
	document.getElementById("www").appendChild(fragment);

	$(document).ready(function() {
			$('www').append(finalString);
		});

}
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
        return frag;
    }
