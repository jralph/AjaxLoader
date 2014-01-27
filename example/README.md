AJAX Loader
===========

The `ajaxLoader` plugin provides a simple and easy to use interface between your html code and the ajax functionality of jQuery. 

It provides a simple, flexible and customisable way to ajaxLoad content to a page or to submit a form via ajax and load the results.

The `ajaxLoader` script comes with all settings pregonfigured, all you need to do is load the script, initialise it and create your html. The `ajaxForm` script can work without any configuration, but for optimal results, some small configuration items should be provided.

Contents
--------

- __[ajaxLoader.js](#ajaxloaderjs)__
	- [Basic Usage](#basic-usage)
	- [Autoloading Content](#autoloading-content)
	- [Advanced Usage &amp; Settings](#advanced-usage--settings)
		- [Autoload Identifier](#autoload-identifier)
		- [Load To &amp; Default Load To](#load-to--default-load-to)
		- [Content Source](#content-source)
		- [Content Selector &amp; Content Selector Default](#content-selector--content-selector-default)
		- [Ajax On](#ajax-on)
		- [Animations](#animations)
		- [Loading Placeholder](#loading-placeholder)
- __[ajaxForm.js](#ajaxformjs)__
	- [Basic Example](#basic-example)
	- [Advanced Usage &amp; Settings](#advanced-usage--settings)
		- [Method Selector](#method-selector)
		- [Data Type &amp; Data Return](#data-type--data-return)


ajaxLoader.js
-------------

Below is the documentation for the `ajaxLoader.js` script.

### Basic Usage ###

The basic usage of the plugin is very simple and straight forward, and works with any elements. 

```html
<!--
index.html
-->
<!-- The HTML link. -->
<a href="second-page.html">Click Me!</a>

<!-- 
A second link, with the data-content option passed to 
tell the script where to load the content from on second-page.html. 
-->
<a data-content="#ajax-content-two" href="second-page.html">Click Me 2!</a>

<!-- The container to load to. -->
<div id="ajax-container"></div>

<!-- Load the ajaxLoader script. -->
<script src="js/ajaxloader.min.js"></script>
<script>
	// Create a function to wrap jQuery in.
	$(function() {
		// Register ajaxLoader for all <a> elements.
		$('a').ajaxLoader();
	});
</script>

<!--
second-page.html
-->
<!-- The container to load from when 'Click Me!' is clicked. -->
<div id="ajax-content">
	Hello World!
</div>
<!-- The second container to load when 'Click Me 2!' is clicked. -->
<div id="ajax-content-two">
	Hello Other World!
</div>
```

With the above code, when the user clicks on 'Click Me!', the content from `#ajax-content` (including the div its self) will be loaded into `#ajax-container`. 

If the user clicks on 'Click Me 2!', the content from `#ajax-content-two` will be loaded into `#ajax-container`, again including the div its self.

### Autoloading Content ###

You may wish to automatically ajax load some content when the user loads the page. This is easily possible by adding the `.ajax-autoload` class to your links.

```html
<!-- A link with the .ajax-autoload class. -->
<a class="ajax-autoload" href="second-page.html">Click Me!</a>
```

Now, as soon as the script runs, it will automatically load the content from `second-page.html#ajax-content` to the `#ajax-container` div. You may give the `.ajax-autoload` class to as many elements as you want, and provide a different `data-load-to` paramater to each one, to tell the script to load to different containers.

*NOTE: If no `data-load-to` paramater is provided, the script will load each element with the `.ajax-autoload` class into the same container, in order they are found in the DOM. Thus overwriting each other, until the last elemenet is loaded.*

A simple example of having multiple autoloading elements can be found below.

```html
<!--
index.html
-->
<!-- The HTML link. -->
<a class="ajax-autoload" href="second-page.html">Click Me!</a>

<!-- 
A second link, with the data-content option passed to 
tell the script where to load the content from on second-page.html. 
-->
<a class="ajax-autoload" data-load-to="#ajax-container-two" data-content="#ajax-content-two" href="second-page.html">Click Me 2!</a>

<!-- The container to load to. -->
<div id="ajax-container"></div>

<!-- The second container to load to. -->
<div id="ajax-container-two"></div>

<!-- Load the ajaxLoader script. -->
<script src="js/ajaxloader.min.js"></script>
<script>
	// Create a function to wrap jQuery in.
	$(function() {
		// Register ajaxLoader for all <a> elements.
		$('a').ajaxLoader();
	});
</script>

<!--
second-page.html
-->
<!-- The container to load from when 'Click Me!' is clicked. -->
<div id="ajax-content">
	Hello World!
</div>
<!-- The second container to load when 'Click Me 2!' is clicked. -->
<div id="ajax-content-two">
	Hello Other World!
</div>
```

In the above example, both divs (`#ajax-container` and `#ajax-container-two`) will be loaded with content from `second-page.html` straight away.

### Advanced Usage &amp; Settings ###

Below you can find a list (with examples) of all of the settings and their defaults that the plugin offers. These settings make the plugin highly customisable and adaptable to any situation.

```js
{
	autoload_identifier: '.ajax-autoload',
	load_to: 'data-load-to',
	load_to_default: '#ajax-container',
	content_source: 'href',
	content_selector: 'data-content',
	content_selector_default: '#ajax-content',
	ajax_on: 'click',
	in_animation: 'fadeIn',
	in_animation_speed: 400,
	out_animation: 'fadeOut',
	out_animation_speed: 400,
	loading_placeholder: 'By default, a div that contains a loading spinner gif.',
	default_link: null
};
```

### Autoload Identifier ###

This option lets you change the class identifier used to autoload content. In the example in the basic section of this readme, you can see that the `.ajax-autoload` class is used. Changing this setting to something like `.autoload-me` would mean that we need to replace `.ajax-autoload` with `.autoload-me` instead. 

```html
<!-- ... rest of code ... -->

<a class="autoload-me" href="second-page.html">Click Me!</a>

<!-- ... rest of code ... -->

<script>
	$(function() {
		$('a').ajaxLoader({
			autoload_identifier: '.autoload-me'
		});
	});
</script>
```

### Load To &amp; Default Load To ###

This option lets you specify the attribute of the element to get the `load-to` paramater from. This paramater tells the script what element or selector to get the content from on the requested page.

*In the main example above, we provide the `data-load-to="#ajax-container-two"`, which tells the script to load the links content to this container.*

Changing this option would mean that instaed of using `data-load-to` we would use this option. If the option were changed to `data-container` we would use that instead of `data-load-to`.

```html
<!-- ... rest of code ... -->

<a data-container="#ajax-container-two" href="second-page.html">Click Me!</a>

<!-- ... rest of code ... -->

<script>
	$(function() {
		$('a').ajaxLoader({
			load_to: 'data-container'
		});
	});
</script>
```

The `load_to_default` option provides a default container id to load to if the `data-load-to` (or provided data attribute) is not provided. The default of this is `#ajax-container`. You can see this in action in the main example above, we have a link setup with no `data-load-to` attribute, which loads any content to the `#ajax-container` element by default.

```html
<!-- ... rest of code ... -->

<a href="second-page.html">Click Me!</a>

<div id="my-container"></div>

<!-- ... rest of code ... -->

<script>
	$(function() {
		$('a').ajaxLoader({
			load_to_default: '#my-container'
		});
	});
</script>
```

In the above example, when `Click Me!` is clicked, the content will be loaded from `second-page.html` to the `#my-container` element.

### Content Source ###

The content source setting allows you to tell the script where to get the url to load from. By default, this is set to the `href` attribute. You may wish to change this if you are using the ajaxLoader with any element other than the `<a>` tag. For example, we could use a button instead.

```html
<!-- ... rest of code ... -->

<button data-target="second-page.html">Click Me!</button>

<!-- ... rest of code ... -->

<script>
	$(function() {
		$('a').ajaxLoader({
			content_source: 'data-target'
		});
	});
</script>
```

### Content Selector &amp; Content Selector Default ###

These options function very similar to the `Load To &amp; Load To Default` options. The main difference is, that instead of specifying elements on the current page, you specify elements on the page you are loading from. 

In the main example above, we use the `data-content` attribute to tell the script what content to load from the requested file. (eg. if we use `#my-content`, the element with that ID would be loaded from the requested page, into the container element.)

The `content_selector` setting lets you change which `data-` attribute should be used, and the `content_selector_default` attribute specifies the ID that the script should look for by default.

```html
<!--
index.html
-->
<!-- The HTML link. -->
<a href="second-page.html">Click Me!</a>

<!-- 
A second link, with the data-my-content option passed to 
tell the script where to load the content from on second-page.html. 
-->
<a data-my-content="#ajax-content-two" href="second-page.html">Click Me 2!</a>

<!-- The container to load to. -->
<div id="ajax-container"></div>

<!-- Load the ajaxLoader script. -->
<script src="js/ajaxloader.min.js"></script>
<script>
	// Create a function to wrap jQuery in.
	$(function() {
		// Register ajaxLoader for all <a> elements.
		$('a').ajaxLoader({
			content_selector: 'data-my-content',
			content_selector_default: '#my-content'
		});
	});
</script>

<!--
second-page.html
-->
<!-- The container to load from when 'Click Me!' is clicked. -->
<div id="my-content">
	Hello World!
</div>
<!-- The second container to load when 'Click Me 2!' is clicked. -->
<div id="ajax-content-two">
	Hello Other World!
</div>
```

### Ajax On ###

This setting is nice and simple. It lets you tell the script what event the ajax loading should be performed on. (eg, `click`, `hover`, `focus`, `load` and so on.) This can be changed to provide some interesting effects. The down side of this, is that you would need to call the ajaxLoader plugin multiple times for the selectors you wish to use your `ajax_on` setting for, and ones you wish to use the default `click` setting on. 

```html
<!--
index.html
-->
<!-- The HTML link. -->
<a class="ajax-hover" href="second-page.html">Click Me!</a>

<!-- 
A second link, with the data-my-content option passed to 
tell the script where to load the content from on second-page.html. 
-->
<a class="ajax-click" href="second-page.html">Click Me 2!</a>

<!-- The container to load to. -->
<div id="ajax-container"></div>

<!-- Load the ajaxLoader script. -->
<script src="js/ajaxloader.min.js"></script>
<script>
	// Create a function to wrap jQuery in.
	$(function() {
		// Register ajaxLoader for all <a class="ajax-hover"> elements.
		$('a.ajax-hover').ajaxLoader({
			ajax_on: 'hover'
		});

		// Register ajaxLoader for all <a class="ajax-standard"> elements.
		$('a.ajax-standard').ajaxLoader();
	});
</script>
```

In the above example, when `Click Me!` is hovered, the content will be loaded into `#ajax-container`. If `Click Me 2!` is clicked, then the content will also be loaded into the container.

__BONUS:__ A handy feature that this provides is the ability to bind ajax loads to custom jquery events using the `.trigger()` method. This can be done like so:

```js
$(function() {
	$(document).ajaxLoader({
		ajax_on: 'my-custom-event',
		default_link: 'second-page.html'
	});
});
```

Note that this also uses the `default_link` paramater. This paramater lets you give the script a link to go to if no attribute is found providing one. As we are binding to the `document` here, we can not provide a link, so we must use this option to tell it where to send the request. This also means you are limited to 1 link per custom event, for now!

### Animations ###

These settings provide a way to change the animation of the ajax load.

- `in_animation` - The animation effect to use when loading in content.
- `in_animation_speed` - The speed of the in_animation.
- `out_animation` - The animation effect to use when hiding content.
- `out_animation_speed` - The sped of the out_animation.

*Note: If you do not wish for any 'animations', you may set the `in/out_animation` to `show/hide`.*

```js
$(function() {
	// Register ajaxLoader for all <a> elements.
	$('a').ajaxLoader({
		in_animation: 'slideDown',
		in_animation: 600,
		out_animation: 'slideUp',
		out_animation_speed: 600
	});
});
```

### Loading Placeholder ###

This setting lets you specify some content for the loading placeholder. By default, this is a rotating loader .gif image. You can add any html or text in this contetn, but not a function.

```js
$(function() {
	// Register ajaxLoader for all <a> elements.
	$('a').ajaxLoader({
		loading_placeholder: 'Loading...'
	});
});
```

ajaxForm.js
-----------

The ajaxForm.js plugin is similar to the ajaxLoader plugin, but instead of working with button clicks or element events, it works only on form submit events. It will send the form data to the page and load it into the specified area, just like the ajaxLoader. The main difference is that with ajaxForm, you can provide some different settings, such as some javascript to perform when the ajax call is completed (like displaying a 'Success!' message or something!).

### Basic Example ###

The basic example includes a simple form, some input fields and the default configuration.

```html
<!--
	index.php
-->
<form id="ajax-form" method="post" action="form.php">
	
	<!-- Some simple text input fields. -->
	<input type="text" name="field-1">
	<input type="text" name="field-2">
	
	<!-- A submit button, can also use <input type="submit">. -->
	<button type="submit">Submit!</button>

</form>

<!-- The container for the ajax loadec content. -->
<div id="ajax-form-container"></div>

<!-- Include the script. -->
<script src="js/ajaxform.js"></script>
<script>
	// Initialise the plugin on the form.
	$(function() {
		$('form#ajax-form').ajaxForm();
	});
</script>
```

And on the form.php page, we can do the following.

```php
<?php
// Note, if the form method is set to get instead of post, we can use $_GET here instead.
$field_1 = $_POST['field-1'];
$field_2 = $_POST['field-2'];

if ($field_1 && $field_2) echo $field_1 . ' ' . $field_2;
?>
```

Now, if the user submits the form with the values `field-1 = Joe` and `field-2 = Blogs`, the content loaded into the container when the form is processed would be `Joe Blogs`.

*Note: The form method can be set to get instead of post, this means that the ajax request will not be posted, but instead will use the get method. In PHP, make sure you use `$_GET` instead of `$_POST` for this!*

### Advanced Use &amp; Settings ###

This plugin features most of the settings from the ajaxLoader, and each setting will work in the exact same way. Below you can find a list of the settings, if they are the same as the ajaxLoader and instructions for any new settings.

```js
{
	load_to: 'data-load-to', 					// Same as ajaxLoader.
	load_to_default: '#ajax-form-container',	// Same as ajaxLoader.
	method_selector: 'method',					// See below documentation.
	data_type: 'text',							// See below documentation.
	data_return: null,							// See below documentation.
	content_source: 'action',					// same as ajaxLoader.
	in_animation: 'fadeIn',						// same as ajaxLoader.
	in_animation_speed: 200,					// same as ajaxLoader.
	out_animation: 'fadeOut',					// same as ajaxLoader.
	out_animation_speed: 200,					// same as ajaxLoader.
	loading_placeholder: ''						// same as ajaxLoader.
}
```

### Method Selector ###

This option tells the plugin which field to check to find the form method. (get, post ect)

By default, this is set to use the form `method` so that forms can be ajaxloaded without any change to the form its self. 

For example, you could change this to use a data-attribuve if you so wish.

```js
$('form#ajax-form').ajaxForm({
	method_selector: 'data-method'
});
```

And in the html.

```html
<form id="ajax-form" data-method="post" action="form.php">
	<!-- Rest of form here. -->
</form>
```

### Data Type &amp; Data Return ###

These settings are best to use together. 

The `data_type` setting allows you to specify the type of data expected to be returned from the form page. (eg, `json`, `text`, `xml` and so on.)

The `data_return` setting allows you to provide a closure function to process the content your self. This can be good for processing and returning `json` content from the form page. When passing a function to `data_return` you should also accept the `data` and `form_name` variables (See below).

```html
<form name="form-1" id="ajax-form" method="post" action="form.php">
	<!-- Rest of form here. -->
</form>

<div id="ajax-form-container"></div>

<script>
	$(function() {
		$('form#ajax-form').ajaxForm({
			data_type: 'json',
			data_return: function(data, form_name) {
				/*
				Note that this will be run for every form matching the selector.
				If you are a single selector for multiple forms, I recomment that you
				use a switch around the 'form_name' variable. Which will return the name paramater passed into the form.
				Eg. <form name="form-1" ... >
				 */
				var message;
				switch (form_name) {
					case 'form-1':
						// We can return a string to load into the container div, or you can remove the return
						// and use your own script here. For example, you could load content into a different tag,
						// run a different function, redirect the user or do some other custom action.
						
						// We are expecting a json response.
						alert('Field 1: ' + data.field_1 + ' Field 2: ' + data.field_2);
						message = 'Success!';
						break;
					default:
						message = 'Form Processed But No Readable Response!';
				}

				// Return the message to be loaded into the container element.
				return message;
			}
		});
	});
</script>
```

In the above example, when a user fills out the form and hits the submit button, as long as the form.php backend responds with a json array with the items `field_1` and `field_2`, the user should see an alwer with the data they entered into the form, as well as the `#ajax-form-container` content change to the message `Success!`.