jQuery.fn.expand = function(selector, callback) {
	var $this = $(this);	if(selector == undefined) return $this;
	
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
				$this.append(el);								try { console.log(operat); } catch(e) {};
								if(operator == undefined) {					// deepest iteration - let's bring in the callback										if(callback != undefined) jQuery.each([el], callback);									} else if(operator == '+') {
					$this.expand(subSelector, callback);
				} else if (operator == '>') {
					el.expand(subSelector, callback);
				}
			}
		});
	});

	
	return $(this).find('>*');
}

jQuery.zen = {
	expand: function(selector, callback) {
		return $('<span>').expand(selector, callback);
	},
}