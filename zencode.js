jQuery.fn.expand = function(selector) {
	var $this = $(this);
	
	if(selector == undefined) return $this;
	
/*	$(this).append($('<span>').text('xxx')); */

	selector.replace(/^([^>+]+)(([>+])(.*))?/, function($0, instruction, $1, operator, subSelector) {
		instruction.replace(/^([^*]+)(\*([0-9]+))?/, function($0, tag, multiplier, factor) {
			if(factor == undefined) factor = 1;
			if(factor < 1) factor = 1;
			
			//try { console.log(factor); } catch(e) {};
			
			var tagName = tag.match(/[^.#]+/)[0];
			
			for(var i = 1; i <= factor; i++) {
				//try { console.dir(instruction); } catch(e) {};
				
				var el = $('<' + tagName + '>');
				
				tag.replace(/([.#])([^.#]+)/g, function($0, kind, name) {
					if(kind == '#') {
						el.attr('id', name);
					} else if(kind == '.') {
						el.addClass(name);
					}
				});
				
				//$(this).append(el);
				$this.append(el);
				
				if(operator == '+') {
					$this.expand(subSelector);
				} else if (operator == '>') {
					el.expand(subSelector);
				}
				
				/*

				if(subSelector != undefined) {
					var sub = jQuery.zen.subExpand(subSelector);
					if(operator == '>') {
						$.each(sub, function() {
							el.append(this);
						});
					} else if(operator == '+') {
						$.each(sub, function() {
							result.push(this);
						});
					}
				}*/
			}
		});
	});

	
	return $(this).find('>*');
}

jQuery.zen = {
	expand: function(selector) {
		/*var r = $('<span>');
		
		jQuery.each(jQuery.zen.subExpand(selector), function() {
			r.append(this);
		});
		
		return r.find('>*');*/
		
		return $('<span>').expand(selector);
	},
}