(function ($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return 'label label-info';
    },
    focusClass: 'focus',
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    itemTitle: function(item) {
      return null;
    },
    freeInput: true,
    addOnBlur: true,
    maxTags: undefined,
    maxChars: undefined,
    confirmKeys: [13, 44],
    delimiter: ',',
    delimiterRegex: null,
    cancelConfirmKeysOnEmpty: false,
    onTagExists: function(item, $tag) {
      $tag.hide().fadeIn();
    },
    trimValue: false,
    allowDuplicates: false,
    triggerChange: true
  };

  /**
   * Constructor function
   */
  function TagsInput(element, options) {
    this.isInit = true;
    this.itemsArray = [];

    this.$element = $(element);
    this.$element.hide();

    this.isSelect = (element.tagName === 'SELECT');
    this.multiple = (this.isSelect && element.hasAttribute('multiple'));
    this.objectItems = options && options.itemValue;
    this.placeholderText = element.hasAttribute('placeholder') ? this.$element.attr('placeholder') : '';
    this.inputSize = Math.max(1, this.placeholderText.length);

    this.$container = $('<div class="bootstrap-tagsinput"></div>');
    this.$input = $('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container);

    this.$element.before(this.$container);

    this.build(options);
    this.isInit = false;
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    /**
     * Adds the given item as a new tag. Pass true to dontPushVal to prevent
     * updating the elements val()
     */
    add: function(item, dontPushVal, options) {
      var self = this;

      if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
        return;

      // Ignore falsey values, except false
      if (item !== false && !item)
        return;

      // Trim value
      if (typeof item === "string" && self.options.trimValue) {
        item = $.trim(item);
      }

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && !self.objectItems)
        throw("Can't add objects when itemValue option is not set");

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/))
        return;

      // If SELECT but not multiple, remove current tag
      if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
        self.remove(self.itemsArray[0]);

      if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
        var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
        var items = item.split(delimiter);
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal)
            self.pushVal(self.options.triggerChange);
          return;
        }
      }

      var itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item),
          itemTitle = self.options.itemTitle(item);

      // Ignore items allready added
      var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];
      if (existing && !self.options.allowDuplicates) {
        // Invoke onTagExists
        if (self.options.onTagExists) {
          var $existingTag = $(".tag", self.$container).filter(function() { return $(this).data("item") === existing; });
          self.options.onTagExists(item, $existingTag);
        }
        return;
      }

      // if length greater than limit
      if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
        return;

      // raise beforeItemAdd arg
      var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options});
      self.$element.trigger(beforeItemAddEvent);
      if (beforeItemAddEvent.cancel)
        return;

      // register item in internal array and map
      self.itemsArray.push(item);

      // add a tag element

      var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
      $tag.data('item', item);
      self.findInputWrapper().before($tag);
      $tag.after(' ');

      if (self.isSelect) {
        // Check to see if the tag exists in its raw or uri-encoded form
        var optionExists = (
            $('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element).length ||
            $('option[value="' + htmlEncode(itemValue) + '"]', self.$element).length
        );
        // add <option /> if item represents a value not present in one of the <select />'s options
        if(!optionExists){
          var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
          $option.data('item', item);
          $option.attr('value', itemValue);
          self.$element.append($option);
        }        
      }

      if (!dontPushVal)
        self.pushVal(self.options.triggerChange);

      // Add class when reached maxTags
      if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
        self.$container.addClass('bootstrap-tagsinput-max');

      // If using typeahead, once the tag has been added, clear the typeahead value so it does not stick around in the input.
      if ($('.typeahead, .twitter-typeahead', self.$container).length) {
        self.$input.typeahead('val', '');
      }

      if (this.isInit) {
        self.$element.trigger($.Event('itemAddedOnInit', { item: item, options: options }));
      } else {
        self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
      }
    },

    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    remove: function(item, dontPushVal, options) {
      var self = this;

      if (self.objectItems) {
        if (typeof item === "object")
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  self.options.itemValue(item); } );
        else
          item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  item; } );

        item = item[item.length-1];
      }

      if (item) {
        var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false, options: options });
        self.$element.trigger(beforeItemRemoveEvent);
        if (beforeItemRemoveEvent.cancel)
          return;

        $('.tag', self.$container).filter(function() { return $(this).data('item') === item; }).remove();
        $('option', self.$element).filter(function() { return $(this).data('item') === item; }).remove();
        if($.inArray(item, self.itemsArray) !== -1)
          self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
      }

      if (!dontPushVal)
        self.pushVal(self.options.triggerChange);

      // Remove class when reached maxTags
      if (self.options.maxTags > self.itemsArray.length)
        self.$container.removeClass('bootstrap-tagsinput-max');

      self.$element.trigger($.Event('itemRemoved',  { item: item, options: options }));
    },

    /**
     * Removes all items
     */
    removeAll: function() {
      var self = this;

      $('.tag', self.$container).remove();
      $('option', self.$element).remove();

      while(self.itemsArray.length > 0)
        self.itemsArray.pop();

      self.pushVal(self.options.triggerChange);
    },

    /**
     * Refreshes the tags so they match the text/value of their corresponding
     * item.
     */
    refresh: function() {
      var self = this;
      $('.tag', self.$container).each(function() {
        var $tag = $(this),
            item = $tag.data('item'),
            itemValue = self.options.itemValue(item),
            itemText = self.options.itemText(item),
            tagClass = self.options.tagClass(item);

          // Update tag's class and inner text
          $tag.attr('class', null);
          $tag.addClass('tag ' + htmlEncode(tagClass));
          $tag.contents().filter(function() {
            return this.nodeType == 3;
          })[0].nodeValue = htmlEncode(itemText);

          if (self.isSelect) {
            var option = $('option', self.$element).filter(function() { return $(this).data('item') === item; });
            option.attr('value', itemValue);
          }
      });
    },

    /**
     * Returns the items added as tags
     */
    items: function() {
      return this.itemsArray;
    },

    /**
     * Assembly value by retrieving the value of each item, and set it on the
     * element.
     */
    pushVal: function() {
      var self = this,
          val = $.map(self.items(), function(item) {
            return self.options.itemValue(item).toString();
          });

      self.$element.val(val, true);

      if (self.options.triggerChange)
        self.$element.trigger('change');
    },

    /**
     * Initializes the tags input behaviour on the element
     */
    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);
      // When itemValue is set, freeInput should always be false
      if (self.objectItems)
        self.options.freeInput = false;

      makeOptionItemFunction(self.options, 'itemValue');
      makeOptionItemFunction(self.options, 'itemText');
      makeOptionFunction(self.options, 'tagClass');

      // Typeahead Bootstrap version 2.3.2
      if (self.options.typeahead) {
        var typeahead = self.options.typeahead || {};

        makeOptionFunction(typeahead, 'source');

        self.$input.typeahead($.extend({}, typeahead, {
          source: function (query, process) {
            function processItems(items) {
              var texts = [];

              for (var i = 0; i < items.length; i++) {
                var text = self.options.itemText(items[i]);
                map[text] = items[i];
                texts.push(text);
              }
              process(texts);
            }

            this.map = {};
            var map = this.map,
                data = typeahead.source(query);

            if ($.isFunction(data.success)) {
              // support for Angular callbacks
              data.success(processItems);
            } else if ($.isFunction(data.then)) {
              // support for Angular promises
              data.then(processItems);
            } else {
              // support for functions and jquery promises
              $.when(data)
               .then(processItems);
            }
          },
          updater: function (text) {
            self.add(this.map[text]);
            return this.map[text];
          },
          matcher: function (text) {
            return (text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !== -1);
          },
          sorter: function (texts) {
            return texts.sort();
          },
          highlighter: function (text) {
            var regex = new RegExp( '(' + this.query + ')', 'gi' );
            return text.replace( regex, "<strong>$1</strong>" );
          }
        }));
      }

      // typeahead.js
      if (self.options.typeaheadjs) {
          var typeaheadConfig = null;
          var typeaheadDatasets = {};

          // Determine if main configurations were passed or simply a dataset
          var typeaheadjs = self.options.typeaheadjs;
          if ($.isArray(typeaheadjs)) {
            typeaheadConfig = typeaheadjs[0];
            typeaheadDatasets = typeaheadjs[1];
          } else {
            typeaheadDatasets = typeaheadjs;
          }

          self.$input.typeahead(typeaheadConfig, typeaheadDatasets).on('typeahead:selected', $.proxy(function (obj, datum) {
            if (typeaheadDatasets.valueKey)
              self.add(datum[typeaheadDatasets.valueKey]);
            else
              self.add(datum);
            self.$input.typeahead('val', '');
          }, self));
      }

      self.$container.on('click', $.proxy(function(event) {
        if (! self.$element.attr('disabled')) {
          self.$input.removeAttr('disabled');
        }
        self.$input.focus();
      }, self));

        if (self.options.addOnBlur && self.options.freeInput) {
          self.$input.on('focusout', $.proxy(function(event) {
              // HACK: only process on focusout when no typeahead opened, to
              //       avoid adding the typeahead text as tag
              if ($('.typeahead, .twitter-typeahead', self.$container).length === 0) {
                self.add(self.$input.val());
                self.$input.val('');
              }
          }, self));
        }

      // Toggle the 'focus' css class on the container when it has focus
      self.$container.on({
        focusin: function() {
          self.$container.addClass(self.options.focusClass);
        },
        focusout: function() {
          self.$container.removeClass(self.options.focusClass);
        },
      });

      self.$container.on('keydown', 'input', $.proxy(function(event) {
        var $input = $(event.target),
            $inputWrapper = self.findInputWrapper();

        if (self.$element.attr('disabled')) {
          self.$input.attr('disabled', 'disabled');
          return;
        }

        switch (event.which) {
          // BACKSPACE
          case 8:
            if (doGetCaretPosition($input[0]) === 0) {
              var prev = $inputWrapper.prev();
              if (prev.length) {
                self.remove(prev.data('item'));
              }
            }
            break;

          // DELETE
          case 46:
            if (doGetCaretPosition($input[0]) === 0) {
              var next = $inputWrapper.next();
              if (next.length) {
                self.remove(next.data('item'));
              }
            }
            break;

          // LEFT ARROW
          case 37:
            // Try to move the input before the previous tag
            var $prevTag = $inputWrapper.prev();
            if ($input.val().length === 0 && $prevTag[0]) {
              $prevTag.before($inputWrapper);
              $input.focus();
            }
            break;
          // RIGHT ARROW
          case 39:
            // Try to move the input after the next tag
            var $nextTag = $inputWrapper.next();
            if ($input.val().length === 0 && $nextTag[0]) {
              $nextTag.after($inputWrapper);
              $input.focus();
            }
            break;
         default:
             // ignore
         }

        // Reset internal input's size
        var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
        $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      self.$container.on('keypress', 'input', $.proxy(function(event) {
         var $input = $(event.target);

         if (self.$element.attr('disabled')) {
            self.$input.attr('disabled', 'disabled');
            return;
         }

         var text = $input.val(),
         maxLengthReached = self.options.maxChars && text.length >= self.options.maxChars;
         if (self.options.freeInput && (keyCombinationInList(event, self.options.confirmKeys) || maxLengthReached)) {
            // Only attempt to add a tag if there is data in the field
            if (text.length !== 0) {
               self.add(maxLengthReached ? text.substr(0, self.options.maxChars) : text);
               $input.val('');
            }

            // If the field is empty, let the event triggered fire as usual
            if (self.options.cancelConfirmKeysOnEmpty === false) {
                event.preventDefault();
            }
         }

         // Reset internal input's size
         var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
         $input.attr('size', Math.max(this.inputSize, $input.val().length));
      }, self));

      // Remove icon clicked
      self.$container.on('click', '[data-role=remove]', $.proxy(function(event) {
        if (self.$element.attr('disabled')) {
          return;
        }
        self.remove($(event.target).closest('.tag').data('item'));
      }, self));

      // Only add existing value as tags when using strings as tags
      if (self.options.itemValue === defaultOptions.itemValue) {
        if (self.$element[0].tagName === 'INPUT') {
            self.add(self.$element.val());
        } else {
          $('option', self.$element).each(function() {
            self.add($(this).attr('value'), true);
          });
        }
      }
    },

    /**
     * Removes all tagsinput behaviour and unregsiter all event handlers
     */
    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off('keypress', 'input');
      self.$container.off('click', '[role=remove]');

      self.$container.remove();
      self.$element.removeData('tagsinput');
      self.$element.show();
    },

    /**
     * Sets focus on the tagsinput
     */
    focus: function() {
      this.$input.focus();
    },

    /**
     * Returns the internal input element
     */
    input: function() {
      return this.$input;
    },

    /**
     * Returns the element which is wrapped around the internal input. This
     * is normally the $container, but typeahead.js moves the $input element.
     */
    findInputWrapper: function() {
      var elt = this.$input[0],
          container = this.$container[0];
      while(elt && elt.parentNode !== container)
        elt = elt.parentNode;

      return $(elt);
    }
  };

  /**
   * Register JQuery plugin
   */
  $.fn.tagsinput = function(arg1, arg2, arg3) {
    var results = [];

    this.each(function() {
      var tagsinput = $(this).data('tagsinput');
      // Initialize a new tags input
      if (!tagsinput) {
          tagsinput = new TagsInput(this, arg1);
          $(this).data('tagsinput', tagsinput);
          results.push(tagsinput);

          if (this.tagName === 'SELECT') {
              $('option', $(this)).attr('selected', 'selected');
          }

          // Init tags from $(this).val()
          $(this).val($(this).val());
      } else if (!arg1 && !arg2) {
          // tagsinput already exists
          // no function, trying to init
          results.push(tagsinput);
      } else if(tagsinput[arg1] !== undefined) {
          // Invoke function on existing tags input
            if(tagsinput[arg1].length === 3 && arg3 !== undefined){
               var retVal = tagsinput[arg1](arg2, null, arg3);
            }else{
               var retVal = tagsinput[arg1](arg2);
            }
          if (retVal !== undefined)
              results.push(retVal);
      }
    });

    if ( typeof arg1 == 'string') {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;

  /**
   * Most options support both a string or number as well as a function as
   * option value. This function makes sure that the option with the given
   * key in the given options is wrapped in a function
   */
  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var propertyName = options[key];
      options[key] = function(item) { return item[propertyName]; };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== 'function') {
      var value = options[key];
      options[key] = function() { return value; };
    }
  }
  /**
   * HtmlEncodes the given value
   */
  var htmlEncodeContainer = $('<div />');
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return '';
    }
  }

  /**
   * Returns the position of the caret in the given input field
   * http://flightschool.acylt.com/devnotes/caret-position-woes/
   */
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus ();
      var oSel = document.selection.createRange();
      oSel.moveStart ('character', -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
      iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
  }

  /**
    * Returns boolean indicates whether user has pressed an expected key combination.
    * @param object keyPressEvent: JavaScript event object, refer
    *     http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    * @param object lookupList: expected key combinations, as in:
    *     [13, {which: 188, shiftKey: true}]
    */
  function keyCombinationInList(keyPressEvent, lookupList) {
      var found = false;
      $.each(lookupList, function (index, keyCombination) {
          if (typeof (keyCombination) === 'number' && keyPressEvent.which === keyCombination) {
              found = true;
              return false;
          }

          if (keyPressEvent.which === keyCombination.which) {
              var alt = !keyCombination.hasOwnProperty('altKey') || keyPressEvent.altKey === keyCombination.altKey,
                  shift = !keyCombination.hasOwnProperty('shiftKey') || keyPressEvent.shiftKey === keyCombination.shiftKey,
                  ctrl = !keyCombination.hasOwnProperty('ctrlKey') || keyPressEvent.ctrlKey === keyCombination.ctrlKey;
              if (alt && shift && ctrl) {
                  found = true;
                  return false;
              }
          }
      });

      return found;
  }

  /**
   * Initialize tagsinput behaviour on inputs and selects which have
   * data-role=tagsinput
   */
  $(function() {
    $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  });
})(window.jQuery);

;/**
  (The MIT License)

  Copyright (c) 2012 Gilles Ruppert <gilles@madeofbytes.com>

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  'Software'), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  serialises a form to an object. The use is the same than $.fn.serialize
  and $.fn.serializeArray.
  The keys are the form element names and the value is the the form element
  value. If multiple form elements have the same name with different values,
  the value is an array with all the values. `undefined` and `null` are
  converted to empty strings.
 */

jQuery.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  for (var i = 0, l = a.length; i < l; i++) {
    var item = a[i];
    var name = item.name;
    // if the value is null or undefined, we set to empty string, else we
    // use the value passed
    var value = item.value != null ? item.value : '';

    // if the key already exists we convert it to an array
    if (o[name] !== undefined) {
      if (!o[name].push) {
        // convert to array
        o[name] = [o[name]];
      }
      o[name].push(value);
    }
    else {
      o[name] = value ;
    }
  }

  return o;
};

;/**
 * Copyright (C) 2017 Kyle Florence
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * @website https://github.com/kflorence/jquery-deserialize/
 * @version 2.0.0-rc1
 *
 * Dual licensed under the MIT and GPLv2 licenses.
 */
(function( factory ) {
  if ( typeof module === "object" && module.exports ) {
    // Node/CommonJS
    module.exports = factory( require( "jquery" ) );

  } else {
    // Browser globals
    factory( window.jQuery );
  }
}(function( $ ) {

  /**
   * Updates a key/valueArray with the given property and value. Values will always be stored as arrays.
   *
   * @param prop The property to add the value to.
   * @param value The value to add.
   * @param obj The object to update.
   * @returns {object} Updated object.
   */
  function updateKeyValueArray( prop, value, obj ) {
    var current = obj[ prop ];

    if ( current === undefined ) {
      obj[ prop ] = [ value ];

    } else {
      current.push( value );
    }

    return obj;
  }

  /**
   * Get all of the fields contained within the given elements by name.
   *
   * @param $elements jQuery object of elements.
   * @param filter Custom filter to apply to the list of fields.
   * @returns {object} All of the fields contained within the given elements, keyed by name.
   */
  function getFieldsByName( $elements, filter ) {
    var elementsByName = {};

    // Extract fields from elements
    var fields = $elements
      .map(function convertFormToElements() {
        return this.elements ? $.makeArray( this.elements ) : this;
      })
      .filter( filter || ":input:not(:disabled)" )
      .get();

    $.each( fields, function( index, field ) {
      updateKeyValueArray( field.name, field, elementsByName );
    });

    return elementsByName;
  }

  /**
   * Figure out the type of an element. Input type will be used first, falling back to nodeName.
   *
   * @param element DOM element to check type of.
   * @returns {string} The element's type.
   */
  function getElementType( element ) {
    return ( element.type || element.nodeName ).toLowerCase();
  }

  /**
   * Normalize the provided data into a key/valueArray store.
   *
   * @param data The data provided by the user to the plugin.
   * @returns {object} The data normalized into a key/valueArray store.
   */
  function normalizeData( data ) {
    var normalized = {};
    var rPlus = /\+/g;

    // Convert data from .serializeObject() notation
    if ( $.isPlainObject( data ) ) {
      $.extend( normalized, data );

      // Convert non-array values into an array
      $.each( normalized, function( name, value ) {
        if ( !$.isArray( value ) ) {
          normalized[ name ] = [ value ];
        }
      });

    // Convert data from .serializeArray() notation
    } else if ( $.isArray( data ) ) {
      $.each( data, function( index, field ) {
        updateKeyValueArray( field.name, field.value, normalized );
      });

    // Convert data from .serialize() notation
    } else if ( typeof data === "string" ) {
      $.each( data.split( "&" ), function( index, field ) {
        var current = field.split( "=" );
        var name = decodeURIComponent( current[ 0 ].replace( rPlus, "%20" ) );
        var value = decodeURIComponent( current[ 1 ].replace( rPlus, "%20" ) );
        updateKeyValueArray( name, value, normalized );
      });
    }

    return normalized;
  }

  /**
   * Map of property name -> element types.
   *
   * @type {object}
   */
  var updateTypes = {
    checked: [
      "radio",
      "checkbox"
    ],
    selected: [
      "option",
      "select-one",
      "select-multiple"
    ],
    value: [
      "button",
      "color",
      "date",
      "datetime",
      "datetime-local",
      "email",
      "hidden",
      "month",
      "number",
      "password",
      "range",
      "reset",
      "search",
      "submit",
      "tel",
      "text",
      "textarea",
      "time",
      "url",
      "week"
    ]
  };

  /**
   * Get the property to update on an element being updated.
   *
   * @param element The DOM element to get the property for.
   * @returns The name of the property to update if element is supported, otherwise `undefined`.
   */
  function getPropertyToUpdate( element ) {
    var type = getElementType( element );
    var elementProperty = undefined;

    $.each( updateTypes, function( property, types ) {
      if ( $.inArray( type, types ) > -1 ) {
        elementProperty = property;
        return false;
      }
    });

    return elementProperty;
  }

  /**
   * Update the element based on the provided data.
   *
   * @param element The DOM element to update.
   * @param elementIndex The index of this element in the list of elements with the same name.
   * @param value The serialized element value.
   * @param valueIndex The index of the value in the list of values for elements with the same name.
   * @param callback A function to call if the value of an element was updated.
   */
  function update( element, elementIndex, value, valueIndex, callback ) {
    var property = getPropertyToUpdate( element );

    // Handle value inputs
    // If there are multiple value inputs with the same name, they will be populated by matching indexes.
    if ( property == "value" && elementIndex == valueIndex ) {
      element.value = value;
      callback.call( element, value );

    // Handle select menus, checkboxes and radio buttons
    } else if ( property == "checked" || property == "selected" ) {
      var fields = [];

      // Extract option fields from select menus
      if ( element.options ) {
        $.each( element.options, function( index, option ) {
          fields.push( option );
        });

      } else {
        fields.push( element );
      }

      // #37: Remove selection from multiple select menus before deserialization
      if ( element.multiple && valueIndex == 0 ) {
        element.selectedIndex = -1;
      }

      $.each( fields, function( index, field ) {
        if ( field.value == value ) {
          field[ property ] = true;
          callback.call( field, value );
        }
      });
    }
  }

  /**
   * Default plugin options.
   *
   * @type {object}
   */
  var defaultOptions = {
    change: $.noop,
    complete: $.noop
  };

  /**
   * The $.deserialize function.
   *
   * @param data The data to deserialize.
   * @param options Additional options.
   * @returns {jQuery} The jQuery object that was provided to the plugin.
   */
  $.fn.deserialize = function( data, options ) {

    // Backwards compatible with old arguments: data, callback
    if ( $.isFunction( options ) ) {
      options = { complete: options };
    }

    options = $.extend( defaultOptions, options || {} );
    data = normalizeData( data );

    var elementsByName = getFieldsByName( this, options.filter );

    $.each( data, function( name, values ) {
      $.each( elementsByName[ name ], function( elementIndex, element ) {
        $.each( values, function( valueIndex, value ) {
          update( element, elementIndex, value, valueIndex, options.change );
        });
      });
    });

    options.complete.call( this );

    return this;
  };
}));

;/* global bootbox */

require(['translator', 'bootbox'], function (shim, bootbox) {
	'use strict';

	// expose as global with a warning
	if (Object.defineProperty) {
		Object.defineProperty(window, 'bootbox', {
			configurable: true,
			enumerable: true,
			get: function () {
				console.warn('[deprecated] Accessing bootbox globally is deprecated. Use `require(["bootbox"], function (bootbox) { ... })` instead');
				return bootbox;
			},
		});
	} else {
		window.bootbox = bootbox;
	}

	bootbox.setDefaults({
		locale: config.userLang,
	});

	var translator = shim.Translator.create();
	var dialog = bootbox.dialog;
	var attrsToTranslate = ['placeholder', 'title', 'value', 'label'];
	bootbox.dialog = function (options) {
		var show = options.show !== false;
		options.show = false;

		var $elem = dialog.call(bootbox, options);
		var element = $elem[0];

		if (/\[\[.+\]\]/.test(element.outerHTML)) {
			translator.translateInPlace(element, attrsToTranslate).then(function () {
				if (show) {
					$elem.modal('show');
				}
			});
		} else if (show) {
			$elem.modal('show');
		}

		return $elem;
	};

	Promise.all([
		translator.translateKey('modules:bootbox.ok', []),
		translator.translateKey('modules:bootbox.cancel', []),
		translator.translateKey('modules:bootbox.confirm', []),
	]).then(function (translations) {
		var lang = shim.getLanguage();
		bootbox.addLocale(lang, {
			OK: translations[0],
			CANCEL: translations[1],
			CONFIRM: translations[2],
		});

		bootbox.setLocale(lang);
	});
});


;'use strict';

(function () {
	require(['markdown', 'components'], (markdown, components) => {
		async function initHljs() {
			if (window.hljs) {
				return;
			}
			console.debug('[plugin/markdown] Initializing highlight.js');
			let hljs;
			let list;
			if (config.markdown.hljsLanguages.includes('common')) {
				({ default: hljs} = await import(`highlight.js/lib/common`));
				list = 'common';
			} else if (config.markdown.hljsLanguages.includes('all')) {
				({ default: hljs} = await import(`highlight.js`));
				list = 'all';
			} else {
				({ default: hljs} = await import(`highlight.js/lib/core`));
				list = 'core';
			}

			console.debug(`[plugins/markdown] Loaded ${list} hljs library`);

			if (list !== 'all') {
				await Promise.all(config.markdown.hljsLanguages.map(async (language) => {
					if (['common', 'all'].includes(language)) {
						return;
					}

					console.debug(`[plugins/markdown] Loading ${language} support`);
					const { default: lang } = await import('../../node_modules/highlight.js/lib/languages/' + language + '.js');
					hljs.registerLanguage(language, lang);
				}));
			}
			window.hljs = hljs;
			markdown.buildAliasMap();
		}

		$(window).on('action:composer.enhanced', function (evt, data) {
			var textareaEl = data.postContainer.find('textarea');
			markdown.capturePaste(textareaEl);
			markdown.prepareFormattingTools();
		});

		$(window).on('action:composer.preview', {
			selector: '.composer .preview pre code',
		}, async (params) => {
			await initHljs();
			markdown.highlight(params);
		});

		$(window).on('action:posts.loaded action:topic.loaded action:posts.edited', async function (ev, data) {
			await initHljs();
			markdown.highlight(components.get('post/content').find('pre code'));
			markdown.enhanceCheckbox(ev, data);
			markdown.markExternalLinks();
		});
	});
}());

;/* eslint-disable */
/*
 *  Bootstrap Auto-Hiding Navbar - v4.0.0
 *  An extension for Bootstrap's fixed navbar which hides the navbar while the page is scrolling downwards and shows it the other way. The plugin is able to show/hide the navbar programmatically as well.
 *  http://www.virtuosoft.eu/code/bootstrap-autohidingnavbar/
 *
 *  Made by István Ujj-Mészáros
 *  Under Apache License v2.0 License
 */
;(function($, window, document, undefined) {
    var pluginName = 'autoHidingNavbar',
        $window = $(window),
        $document = $(document),
        _scrollThrottleTimer = null,
        _resizeThrottleTimer = null,
        _throttleDelay = 70,
        _lastScrollHandlerRun = 0,
        _previousScrollTop = null,
        _windowHeight = $window.height(),
        _visible = true,
        _hideOffset,
        defaults = {
          disableAutohide: false,
          showOnUpscroll: true,
          showOnBottom: true,
          hideOffset: 'auto', // "auto" means the navbar height
          animationDuration: 200,
          navbarOffset: 0
        };

    function AutoHidingNavbar(element, options) {
      this.element = $(element);
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }

    function hide(autoHidingNavbar) {
      if (!_visible) {
        return;
      }

      autoHidingNavbar.element.addClass('navbar-hidden').animate({
        top: -1 * parseInt(autoHidingNavbar.element.css('height'), 10) + autoHidingNavbar.settings.navbarOffset
      }, {
        queue: false,
        duration: autoHidingNavbar.settings.animationDuration
      });

      try {
        $('.dropdown.open .dropdown-toggle, .dropdown.show .dropdown-toggle', autoHidingNavbar.element).dropdown('toggle');
      }
      catch(e) {}

      _visible = false;

      autoHidingNavbar.element.trigger('hide.autoHidingNavbar');
    }

    function show(autoHidingNavbar) {
      if (_visible) {
        return;
      }

      autoHidingNavbar.element.removeClass('navbar-hidden').animate({
        top: 0
      }, {
        queue: false,
        duration: autoHidingNavbar.settings.animationDuration
      });
      _visible = true;

      autoHidingNavbar.element.trigger('show.autoHidingNavbar');
    }

    function detectState(autoHidingNavbar) {
      var scrollTop = $window.scrollTop(),
          scrollDelta = scrollTop - _previousScrollTop;

      _previousScrollTop = scrollTop;

      if (scrollDelta < 0) {
        if (_visible) {
          return;
        }

        if (autoHidingNavbar.settings.showOnUpscroll || scrollTop <= _hideOffset) {
          show(autoHidingNavbar);
        }
      }
      else if (scrollDelta > 0) {
        if (!_visible) {
          if (autoHidingNavbar.settings.showOnBottom && scrollTop + _windowHeight === $document.height()) {
            show(autoHidingNavbar);
          }
          return;
        }

        if (scrollTop >= _hideOffset) {
          hide(autoHidingNavbar);
        }
      }

    }

    function scrollHandler(autoHidingNavbar) {
      if (autoHidingNavbar.settings.disableAutohide) {
        return;
      }

      _lastScrollHandlerRun = new Date().getTime();

      detectState(autoHidingNavbar);
    }

    function bindEvents(autoHidingNavbar) {
      $document.on('scroll.' + pluginName, function() {
        if (new Date().getTime() - _lastScrollHandlerRun > _throttleDelay) {
          scrollHandler(autoHidingNavbar);
        }
        else {
          clearTimeout(_scrollThrottleTimer);
          _scrollThrottleTimer = setTimeout(function() {
            scrollHandler(autoHidingNavbar);
          }, _throttleDelay);
        }
      });

      $window.on('resize.' + pluginName, function() {
        clearTimeout(_resizeThrottleTimer);
        _resizeThrottleTimer = setTimeout(function() {
          _windowHeight = $window.height();
        }, _throttleDelay);
      });
    }

    function unbindEvents() {
      $document.off('.' + pluginName);

      $window.off('.' + pluginName);
    }

    AutoHidingNavbar.prototype = {
      init: function() {
        this.elements = {
          navbar: this.element
        };

        this.setDisableAutohide(this.settings.disableAutohide);
        this.setShowOnUpscroll(this.settings.showOnUpscroll);
        this.setShowOnBottom(this.settings.showOnBottom);
        this.setHideOffset(this.settings.hideOffset);
        this.setAnimationDuration(this.settings.animationDuration);

        _hideOffset = this.settings.hideOffset === 'auto' ? parseInt(this.element.css('height'), 10) : this.settings.hideOffset;
        bindEvents(this);

        return this.element;
      },
      setDisableAutohide: function(value) {
        this.settings.disableAutohide = value;
        return this.element;
      },
      setShowOnUpscroll: function(value) {
        this.settings.showOnUpscroll = value;
        return this.element;
      },
      setShowOnBottom: function(value) {
        this.settings.showOnBottom = value;
        return this.element;
      },
      setHideOffset: function(value) {
        this.settings.hideOffset = value;
        return this.element;
      },
      setAnimationDuration: function(value) {
        this.settings.animationDuration = value;
        return this.element;
      },
      show: function() {
        show(this);
        return this.element;
      },
      hide: function() {
        hide(this);
        return this.element;
      },
      destroy: function() {
        unbindEvents(this);
        show(this);
        $.data(this, 'plugin_' + pluginName, null);
        return this.element;
      }
    };

    $.fn[pluginName] = function(options) {
      var args = arguments;

      if (options === undefined || typeof options === 'object') {
        return this.each(function() {
          if (!$.data(this, 'plugin_' + pluginName)) {
            $.data(this, 'plugin_' + pluginName, new AutoHidingNavbar(this, options));
          }
        });
      } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
        var returns;

        this.each(function() {
          var instance = $.data(this, 'plugin_' + pluginName);

          if (instance instanceof AutoHidingNavbar && typeof instance[options] === 'function') {
            returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
          }
        });

        return returns !== undefined ? returns : this;
      }

    };

  })(jQuery, window, document);
;'use strict';

$(document).ready(function () {
	setupNProgress();
	setupTaskbar();
	setupEditedByIcon();
	setupMobileMenu();
	configureNavbarHiding();

	$(window).on('resize', utils.debounce(configureNavbarHiding, 200));
	$(window).on('resize', updatePanelOffset);

	function updatePanelOffset() {
		const header = document.getElementById('header-menu');

		if (!header) {
			console.warn('[persona/updatePanelOffset] Could not find #header-menu, panel offset unchanged.');
			return;
		}

		const rect = header.getBoundingClientRect();
		const offset = Math.max(0, rect.bottom);
		document.documentElement.style.setProperty('--panel-offset', `${offset}px`);
	}

	var lastBSEnv = '';
	function configureNavbarHiding() {
		if (!$.fn.autoHidingNavbar) {
			return;
		}

		require(['hooks', 'storage'], (hooks, Storage) => {
			let preference = ['xs', 'sm'];

			try {
				preference = JSON.parse(Storage.getItem('persona:navbar:autohide')) || preference;
			} catch (e) {
				console.warn('[persona/settings] Unable to parse value for navbar autohiding');
			}
			var env = utils.findBootstrapEnvironment();
			// if env didn't change don't destroy and recreate
			if (env === lastBSEnv) {
				return;
			}
			lastBSEnv = env;
			var navbarEl = $('[component="navbar"]');
			navbarEl.autoHidingNavbar('destroy').removeData('plugin_autoHidingNavbar');
			navbarEl.css('top', '');

			hooks
				.on('filter:navigator.scroll', (data) => {
					navbarEl.autoHidingNavbar('setDisableAutohide', true);
					return data;
				})
				.on('action:navigator.scrolled', () => {
					navbarEl.autoHidingNavbar('setDisableAutohide', false);
				});

			hooks.fire('filter:persona.configureNavbarHiding', {
				resizeEnvs: preference,
			}).then(({ resizeEnvs }) => {
				if (resizeEnvs.includes(env)) {
					navbarEl.autoHidingNavbar({
						showOnBottom: false,
					});
				}

				function fixTopCss(topValue) {
					if (ajaxify.data.template.topic) {
						$('.topic .topic-header').css({ top: topValue });
					} else {
						var topicListHeader = $('.topic-list-header');
						if (topicListHeader.length) {
							topicListHeader.css({ top: topValue });
						}
					}
				}

				navbarEl.off('show.autoHidingNavbar')
					.on('show.autoHidingNavbar', function () {
						fixTopCss('');
					});

				navbarEl.off('hide.autoHidingNavbar')
					.on('hide.autoHidingNavbar', function () {
						fixTopCss('0px');
					});
			});
		});
	}

	function setupNProgress() {
		require(['nprogress'], function (NProgress) {
			if (typeof NProgress === 'undefined') {
				return;
			}

			$(window).on('action:ajaxify.start', function () {
				NProgress.set(0.7);
			});

			$(window).on('action:ajaxify.end', function (ev, data) {
				NProgress.done();
				setupHoverCards();

				if (data.url && data.url.match('user/')) {
					setupFavouriteButtonOnProfile();
				}
			});
		});
	}

	function setupTaskbar() {
		require(['persona/taskbar'], function (taskbar) {
			taskbar.init();
		});
	}

	function setupEditedByIcon() {
		function activateEditedTooltips() {
			$('[data-pid] [component="post/editor"]').each(function () {
				var el = $(this);
				var icon;

				if (!el.attr('data-editor')) {
					return;
				}

				icon = el.closest('[data-pid]').find('.edit-icon').first();
				icon.prop('title', el.text()).tooltip().removeClass('hidden');
			});
		}

		$(window).on('action:posts.edited', function (ev, data) {
			var parent = $('[data-pid="' + data.post.pid + '"]');
			var icon = parent.find('.edit-icon').filter(function (index, el) {
				return parseInt($(el).closest('[data-pid]').attr('data-pid'), 10) === parseInt(data.post.pid, 10);
			});
			var el = parent.find('[component="post/editor"]').first();
			icon.prop('title', el.text()).tooltip().removeClass('hidden');
		});

		$(window).on('action:topic.loaded', activateEditedTooltips);
		$(window).on('action:posts.loaded', activateEditedTooltips);
	}

	function setupMobileMenu() {
		require(['persona/mobile-menu'], function (mobileMenu) {
			mobileMenu.init();
		});
	}

	function setupHoverCards() {
		require(['components'], function (components) {
			components.get('topic')
				.on('click', '[component="user/picture"],[component="user/status"]', generateUserCard);
		});

		$(window).on('action:posts.loading', function (ev, data) {
			for (var i = 0, ii = data.posts.length; i < ii; i++) {
				(ajaxify.data.topics || ajaxify.data.posts)[data.posts[i].index] = data.posts[i];
			}
		});
	}

	function generateUserCard(ev) {
		var avatar = $(this);
		var uid = avatar.parents('[data-uid]').attr('data-uid');
		const topicOrPost = (ajaxify.data.topics || ajaxify.data.posts || []).find(d => String(d.uid) === String(uid));
		if (!topicOrPost) return;
		const user = topicOrPost.user;

		$('.persona-usercard').remove();

		if (!user.userslug) {
			return false;
		}

		socket.emit('user.isFollowing', { uid: user.uid }, function (err, isFollowing) {
			if (err) {
				return err;
			}

			app.parseAndTranslate('modules/usercard', user, function (html) {
				var card = $(html);
				avatar.parents('a').after(card.hide());

				if (String(app.user.uid) === String(user.uid) || !app.user.uid) {
					card.find('.btn-morph').hide();
				} else {
					const uid = isFinite(user.uid) ? user.uid : encodeURIComponent(user.userslug);
					setupFavouriteMorph(card, uid, user.username);

					if (isFollowing) {
						$('.btn-morph').addClass('heart');
					} else {
						$('.btn-morph').addClass('plus');
					}
				}

				setupCardRemoval(card);
				card.fadeIn();
			});
		});

		ev.preventDefault();
		return false;
	}

	function setupFavouriteButtonOnProfile() {
		const uid = isFinite(ajaxify.data.uid) ? ajaxify.data.uid : encodeURIComponent(ajaxify.data.userslug);
		setupFavouriteMorph($('[component="account/cover"]'), uid, ajaxify.data.username);
	}

	function setupCardRemoval(card) {
		function removeCard(ev) {
			if ($(ev.target).closest('.persona-usercard').length === 0) {
				card.fadeOut(function () {
					card.remove();
				});

				$(document).off('click', removeCard);
			}
		}

		$(document).on('click', removeCard);
	}

	function setupFavouriteMorph(parent, uid, username) {
		require(['api', 'alerts'], function (api, alerts) {
			parent.find('.btn-morph').click(function (ev) {
				var type = $(this).hasClass('plus') ? 'follow' : 'unfollow';
				var method = $(this).hasClass('plus') ? 'put' : 'del';

				api[method]('/users/' + uid + '/follow').then(() => {
					alerts.success('[[global:alert.' + type + ', ' + username + ']]');
				});

				$(this).toggleClass('plus').toggleClass('heart');
				$(this).translateAttr('title', type === 'follow' ? '[[global:unfollow]]' : '[[global:follow]]');

				if ($(this).find('b.drop').length === 0) {
					$(this).prepend('<b class="drop"></b>');
				}

				var drop = $(this).find('b.drop').removeClass('animate');
				var x = ev.pageX - (drop.width() / 2) - $(this).offset().left;
				var y = ev.pageY - (drop.height() / 2) - $(this).offset().top;

				drop.css({ top: y + 'px', left: x + 'px' }).addClass('animate');
			});
		});
	}
});

;'use strict';

$(document).ready(function () {
	$(window).on('action:app.load', function () {
		require(['composer/drafts'], function (drafts) {
			drafts.migrateGuest();
			drafts.loadOpen();
		});
	});

	$(window).on('action:composer.topic.new', function (ev, data) {
		if (config['composer-default'].composeRouteEnabled !== 'on') {
			require(['composer'], function (composer) {
				composer.newTopic({
					cid: data.cid,
					title: data.title || '',
					body: data.body || '',
					tags: data.tags || [],
				});
			});
		} else {
			ajaxify.go(
				'compose?cid=' + data.cid +
				(data.title ? '&title=' + encodeURIComponent(data.title) : '') +
				(data.body ? '&body=' + encodeURIComponent(data.body) : '')
			);
		}
	});

	$(window).on('action:composer.post.edit', function (ev, data) {
		if (config['composer-default'].composeRouteEnabled !== 'on') {
			require(['composer'], function (composer) {
				composer.editPost({ pid: data.pid });
			});
		} else {
			ajaxify.go('compose?pid=' + data.pid);
		}
	});

	$(window).on('action:composer.post.new', function (ev, data) {
		// backwards compatibility
		data.body = data.body || data.text;
		data.title = data.title || data.topicName;
		if (config['composer-default'].composeRouteEnabled !== 'on') {
			require(['composer'], function (composer) {
				composer.newReply({
					tid: data.tid,
					toPid: data.pid,
					title: data.title,
					body: data.body,
				});
			});
		} else {
			ajaxify.go(
				'compose?tid=' + data.tid +
				(data.pid ? '&toPid=' + data.pid : '') +
				(data.title ? '&title=' + encodeURIComponent(data.title) : '') +
				(data.body ? '&body=' + encodeURIComponent(data.body) : '')
			);
		}
	});

	$(window).on('action:composer.addQuote', function (ev, data) {
		data.body = data.body || data.text;
		data.title = data.title || data.topicName;
		if (config['composer-default'].composeRouteEnabled !== 'on') {
			require(['composer'], function (composer) {
				var topicUUID = composer.findByTid(data.tid);
				composer.addQuote({
					tid: data.tid,
					toPid: data.pid,
					selectedPid: data.selectedPid,
					title: data.title,
					username: data.username,
					body: data.body,
					uuid: topicUUID,
				});
			});
		} else {
			ajaxify.go('compose?tid=' + data.tid + '&toPid=' + data.pid + '&quoted=1&username=' + data.username);
		}
	});

	$(window).on('action:composer.enhance', function (ev, data) {
		require(['composer'], function (composer) {
			composer.enhance(data.container);
		});
	});
});

;/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function (element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();
