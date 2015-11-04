$(document).ready(function(){
	var items = $('#gallery li');
	var itemsByTags = {};

	//loop through tags
	items.each(function(i){
		var element = $(this);
		var tags = element.data('tags').split(',');

		element.attr('data-id',i); //add data attribute for quicksand
		
		$.each(tags, function(key,value){
			value = $.trim(value); //remove whitespace
			
			if(!(value in itemsByTags)) {
				itemsByTags[value] = []; //add empty value
			}

			itemsByTags[value].push(element); //add image to array
		});
	});


	// create 'all items' option
	createList('All Items', items);

	$.each(itemsByTags, function(k,v){
		createList(k,v);
	});


	// click handler
	$('#navbar a').live('click', function(e){
		var link = $(this);
		link.addClass('active').siblings().removeClass('active'); //add active class
		$('#gallery').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});

	$('#navbar a:first').click();

	// create lists
	function createList(text,items) {
		var ul = $('<ul>',{'class':'hidden'}); //create empty ul
		
		$.each(items, function(){
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#gallery'); //add gallery div
		
		var a = $('<a>', {
			html:text,
			href:'#',
			data:{list:ul}
		}).appendTo('#navbar'); //create menu item
	}

});