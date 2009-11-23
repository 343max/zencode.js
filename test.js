$.fn.outerHtml = function() {
	return $('<span>').append(this).html();
}

$().ready(function() {

	$('code.sample').each(function() {
		var $this = $(this);
		
		var result = eval($this.text());
		
		// $('<p>').addClass('result').append(result),
		//$this.after($('<p>').addClass('resultCode').text(result.html()));
		
		$this.after($('<p>').addClass('result').text(result.outerHtml()));
	});

});