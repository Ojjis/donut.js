donut.js
========

Simplest cross-browser (VML+SVG) donut and pie charts generator


## Usage
```js
var myDonutDiv = donut(options); // returns div with donut
```
### Options
- ``container`` (Node) -- CSS selector for parent node where donut should be placed ``[id | class]``
- ``data`` (Array) -- array of objects (eg ``{value: 42, name: 'some name', color: '#fff', className: 'extraClass'}``)
- ``size`` (Number) -- diameter of donut (100 by default)
- ``weight`` (Number) -- weight of arcs (size minus donut hole diameter) (20 by default)
- ``responsive`` (Boolean) -- if the donut should be responsive or not (default false)

```js
var myDonut = donut({
  el: document.getElementById( 'container' ),
  size: 150,
  weight: 30,
  data: [{
    value: 1,
    name: 'A',
    color: '#80a8cc'
    className: 'first'
  },{
    value: 2,
    name: 'B',
    customData: 'Yeah',
    color: '#da3b3e'
    className: 'fish'
  },{
    value: 3,
    name: 'C',
    color: '#ffa921'
    className: 'dog'
  },{
    value: 4,
    name: 'D',
    color: 'red'
    className: 'last'
  }],
  colors: [ '#80a8cc', '#da3b3e', '#ffa921', 'red' ]
});
```

If ``options.weight === options.size/2`` then you get pie chart:

![Donut](http://i.imgur.com/SzBRLVS.png)

```js
var myDonut = donut({
  el: document.getElementById( 'container' ),
  size: 150,
  weight: 75, // <--
  ...
});
```

### Methods
- ``setColor(arc, color)`` -- sets arc color
- ``data(arc[, data])`` -- gets or sets data depending on second parameter

```js
var arc = document.getElementById( 'container' ).querySelector( '[data-name="B"]' );
alert(donut.data(B_Arc).customData);

donut.setColor(arc, '#8dc700');
```

### 

**Lisensed under WTFPL**
