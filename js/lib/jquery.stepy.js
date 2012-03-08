/**
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * ---------------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 * 
 * @version			0.5.1
 * @since			07.03.2010
 * @author			Washington Botelho dos Santos
 * @documentation	http://wbotelhos.com/raty
 * @twitter			http://twitter.com/wbotelhos
 * @license			http://opensource.org/licenses/mit-license.php MIT
 * @package			jQuery Plugins
 * 
 * PATCH: Andreas Herz to use the jQuery Theming
 *
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#stepy').stepy();
 *
 *	<form id="stepy">
 *		<fieldset title="Step 1">
 *			<legend>description one</legend>
 *			<!-- input fields -->
 *		</fieldset>
 *
 *		<fieldset title="Step 2">
 *			<legend>description one</legend>
 *			<!-- input fields -->
 *		</fieldset>
 *
 *		// and so on..
 *
 *		<input type="submit" class="finish" value="Finish!"/>
 *	</form>
 *
 */

;(function($) {

	$.fn.stepy = function(settings) {

		if (this.length == 0) {
			debug('Selector invalid or missing!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.stepy.apply($(this), [settings]);
			});
		}

		var opt				= $.extend({}, $.fn.stepy.defaults, settings),
			$this			= $(this),
			id				= this.attr('id'),
			$steps			= $this.children('fieldset'),
			size			= $steps.size(),
			$titlesWrapper	= $('<ul/>', { id: id + '-titles', 'class': 'ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix stepy-titles' }),
			description		= '',
			title			= '',
			$legend			= null,
			hasLegend		= true,
			hasCancel       = false,
			step;

		if (opt.titleTarget) {
			$(opt.titleTarget).html($titlesWrapper);
		} else {
			$titlesWrapper.insertBefore($this);
		}

		if (id === undefined) {
			id = 'stepy-' + $this.index();
			$this.attr('id', id); 
		}

		$this.data('options', opt);

        if (opt.validate) {
        	$this.append('<div class="stepy-error"/>');
        }

        $steps.each(function(index) {
        	step = $(this);
        	step
        	.attr('id', id + '-step-' + index)
        	.addClass('step ui-widget')
        	.append('<div id="' + id + '-buttons-' + index + '" class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix buttonbar ' + id + '-buttons"/>');

        	title = (step.attr('title') != '') ? step.attr('title') : '--';

        	$legend = step.children('legend');

        	if (!opt.legend) {
        		$legend.hide();
        	}

        	description = '';

        	if (opt.description) {
        		if ($legend.length) {
        			description = '<span>' + $legend.html() + '</span>';
        		} else {
        			debug(id + ': the legend element of the step ' + (index + 1) + ' is required to set the description!');
        			hasLegend = false;
        		}
        	}

        	$titlesWrapper.append('<li class="ui-widget-header" id="' + id + '-title-' + index + '">' + title  + description + '</li>');

        	if (index == 0) {
        		if (size > 1) {
        			createNextButton(index);
        		}
       			createCancelButton(index);
        	} else {
        		createBackButton(index);
        		step.hide();
        		if (index < size - 1) {
	        		createNextButton(index);
	        	}
       			createCancelButton(index);
        	}
        });

        var $titles	= $titlesWrapper.children(),
        	finish	= $this.find('.finish');

        $titles.first().addClass('ui-tabs-selected ui-state-active current-step');

		if (opt.finishButton) {
	        if (finish.length) {
        		if (size > 1) {
        			finish.hide();
                }

        		$this.find('.buttonbar').prepend(finish);
	            finish.button().click(function(e){
	               if (opt.submit) 
	                  opt.submit();
	            });
	        } else {
	        	debug(id + ': element with class name "finish" missing!');
	        }
        }

        function isStopCallback(callback, clicked) {
        	var isValid = callback.apply($this, [clicked + 1]);

        	return !(isValid || isValid === undefined);
        };

        function createCancelButton(index) {
        	$('<button/>', {
        		id:			id + '-cancel-' + index,
        		html:		opt.cancelLabel
        	})
        	 .button()
        	 .click(function(){if (opt.cancel) opt.cancel();})
        	 .addClass("button-cancel")
             .appendTo($('#' + id + '-buttons-' + index));
        };

        function createBackButton(index) {
        	$('<button/>', {
        		id:			id + '-back-' + index,
        		html:		opt.backLabel
        	}).button().addClass("button-back").click(function() {
        		if (!opt.back || !isStopCallback(opt.back, index - 1)) {
	                selectStep($this, index - 1, false);

	                if (index + 1 == size) {
	                	finish.hide();
	                }
        		}
            })
            .appendTo($('#' + id + '-buttons-' + index));
        };

        function createNextButton(index) {
        	$('<button/>', {
        		id:			id + '-next-' + index,
        		html:		opt.nextLabel
        	}).button().addClass("button-next").click(function() {
        		if (!opt.next || !isStopCallback(opt.next, index + 1)) {
	        		var maxStep		= getMaxStep($this, opt, index + 1),
	        			isBlocked	= (maxStep <= index);

					selectStep($this, maxStep, isBlocked);
	
			        if (opt.finishButton && maxStep + 1 == size) {
	                	finish.show();
	                }
        		}
            })
            .appendTo($('#' + id + '-buttons-' + index));
        };

        function getMaxStep(context, opt, clicked) { // TODO: give support of validation from public function. .data().
        	var maxStep = clicked,
        		isValid = true;

        	if (opt.validate) {
	        	for (var i = 0; i < clicked; i++) {
					isValid &= validate($this, i, opt);

					if (opt.block && !isValid) {
						maxStep = i;
						break;
					}
				}
        	}

        	return maxStep;
        };

		return $this;
	};

	function selectStep(context, index, isBlocked) {
		var id		= context.attr('id'),
			$steps	= context.children('fieldset'),
			size	= $steps.size(),
			$titles	= $('ul#' + id + '-titles').children(),
			step;

		if (index > size - 1) {
			index = size - 1;
		}

		$steps.hide().eq(index).show();

		$titles.removeClass('ui-state-default ui-tabs-selected ui-state-active current-step').eq(index).addClass('ui-state-default ui-tabs-selected ui-state-active current-step');

       	var firstField = $steps.eq(index).find(':input:visible:enabled:first');

       	if (!isBlocked) {
       		firstField.focus();
       	}
	};

	function validate(context, index, opt) {
		var id		= context.attr('id'),
			isValid	= true,
			$step	= context.children('fieldset').eq(index),
			$title	= $('ul#' + id + '-titles').children().eq(index);

		$($step.find(':input').get().reverse()).each(function() {
			isValid &= context.validate().element($(this));

			if (isValid === undefined) {
				isValid = true;
			}

			if (isValid) {
				if (opt.errorImage) {
					$title.removeClass('error-image');
				}
			} else {
				if (opt.block) {
					selectStep(context, index, true);
				}

				if (opt.errorImage) {
					$title.addClass('error-image');
				}

				context.validate().focusInvalid();
			}
		});

		return isValid;
	};

    $.fn.stepy.step = function(index, idOrClass) {
    	var context = getContext(index, idOrClass, 'step');

		if (idOrClass.indexOf('.') >= 0) {
			return;
		}

		selectStep(context, index - 1, false);

		$.fn.stepy;
	};

    function getContext(value, idOrClass, name) {
		var context = undefined;

		if (idOrClass == undefined) {
			debug('Specify an ID or class to be the target of the action.');
			return;
		}

		if (idOrClass) {
			if (idOrClass.indexOf('.') >= 0) {
				var idEach;

				return $(idOrClass).each(function() {
					idEach = '#' + $(this).attr('id');

					if (name == 'step') {
						$.fn.stepy.step(value, idEach);
					}
				});
			}

			context = $(idOrClass);

			if (!context.length) {
				debug('"' + idOrClass + '" is a invalid identifier for the public funtion $.fn.stepy.' + name + '().');
				return;
			}
		}

		return context;
	};

    function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

	$.fn.stepy.defaults = {
		back:			null,
		backLabel:		'&lt; Back',
		cancelLabel:	'Cancel',
		block:			false,
		description:	true,
		errorImage:		false,
		finish:			null,
		finishButton:	true,
		legend:			true,
		next:			null,
		submit:			null,
		cancel:			null,
		nextLabel:		'Next &gt;',
		titleClick:		false,
		titleTarget:	'',
		validate:		false
	};

})(jQuery);