donut.js
========

Simplest cross-browser (VML+SVG) donut and pie charts generator


## Usage
```js
var myDonutDiv = Donut(options); // returns div with donut
```
### Options
- ``container`` (Node) -- CSS selector for parent node where donut should be placed ``[id | class]``
- ``data`` (Array) -- array of objects (eg ``{value: 42, name: 'some name', color: '#fff', className: 'extraClass'}``)
- ``size`` (Number) -- diameter of donut (100 by default)
- ``weight`` (Number) -- weight of arcs (size minus donut hole diameter) (20 by default)
- ``responsive`` (Boolean) -- if the donut should be responsive or not (default false)
the containing div with class name equal to the property 'className'
-  ``styles`` (Object) -- classes to be append to ``main`` and ``arc`` elements ``{main: 'main-class', arc: 'arc-class'}``

```js
var myDonut = Donut({
  container: 'parentId' ,
  size: 150,
  weight: 30,
  responsive: true,
  styles:{
    main: 'main-class', 
    arc: 'arc-class'
  },
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
  }]
});
```

If ``options.weight === options.size/2`` then you get pie chart:

```js
var myDonut = Donut({
  container: 'parentId' ,
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
