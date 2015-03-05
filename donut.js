(function () {
    "use strict";

    var doc = document,
        M = Math,
        root = this,
        IE = doc.documentMode < 9,
        donutData = {},
        dataIndex = 0;
    var Donut = function (options) {

        var defaultStyles = {
            arc: "donut-arc",
            main: "donut"
        };


        var div = doc.createElement('div'),
            size = options.size || 100,
            data = options.data || [{value: 1}],
            weight = options.weight || 20,
            styles = options.styles || defaultStyles,
            responsive = options.responsive || false,
            el = document.getElementById(options.container) || document.getElementsByClassName(options.container)[0] || null,
            r = size / 2,
            PI = M.PI,
            sin = M.sin,
            cos = M.cos,
            sum = 0,
            i,
            value,
            arc,
            arcClass,
            startAngle,
            setAttribute = function (el, o) {
                for (var j in o) {
                    el.setAttribute(j, o[j]);
                }
            };

        for (i = 0; i < data.length; i++) {
            sum += data[i].value;
        }

        div.className = styles.main || defaultStyles.main;
        arcClass = styles.arc || defaultStyles.arc;

        var getStyleString = function (extraClass) {
            var classes = [arcClass];
            if (extraClass) {
                classes.push(extraClass);
            }
            return classes.join(' ');
        }

        if (IE) {
            size -= weight;

            var fault = options.fault !== undefined ? options.fault : weight / size * 3, // fault is heuristic value of arc size deviation
                arcStyle,
                fill;
            startAngle = -fault;
            for (i = 0; i < data.length; i++) {
                value = data[i].value / sum;
                arc = doc.createElement('<v:arc>');

                fill = doc.createElement('<v:fill>');
                fill.opacity = 0;

                arc.appendChild(fill);

                arcStyle = arc.style;
                arcStyle.top = arcStyle.left = weight / 2 + 'px';
                arcStyle.width = arcStyle.height = size + 'px';

                setAttribute(arc, {
                    startangle: startAngle - fault,
                    endangle: startAngle = startAngle + value * 360 + fault,
                    strokecolor: data[i].color || '#000',
                    fillcolor: 'none',
                    strokeweight: weight + 'px',
                    'data-name': data[i].name,
                    'class': getStyleString(data[i].className)
                });

                Donut.data(arc, data[i]);
                div.appendChild(arc);
            }
        } else {
            var NS = 'http://www.w3.org/2000/svg',
                svg = doc.createElementNS(NS, 'svg'),
                arcRadius = r - weight / 2;

            startAngle = -PI / 2;

            if (responsive) {
                svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
                svg.setAttribute('preserveAspectRatio', 'xMidYMin slice');
                svg.setAttribute('height', '100%');
                svg.setAttribute('width', '100%');
            } else {
                svg.setAttribute('height', size + 'px');
                svg.setAttribute('width', size + 'px');
            }

            div.appendChild(svg);

            for (i = 0; i < data.length; i++) {
                value = data[i].value / sum;
                value = value === 1 ? .9999 : value;
                arc = doc.createElementNS(NS, 'path');

                var segmentAngle = value * PI * 2,
                    endAngle = segmentAngle + startAngle,
                    largeArc = ((endAngle - startAngle) % (PI * 2)) > PI ? 1 : 0,
                    startX = r + cos(startAngle) * arcRadius,
                    startY = r + sin(startAngle) * arcRadius,
                    endX = r + cos(endAngle) * arcRadius,
                    endY = r + sin(endAngle) * arcRadius;

                startAngle = endAngle;

                setAttribute(arc, {
                    d: [
                        'M', startX, startY,
                        'A', arcRadius, arcRadius, 0, largeArc, 1, endX, endY
                    ].join(' '),
                    stroke: data[i].color || '#000',
                    'stroke-width': weight,
                    fill: 'none',
                    'data-name': data[i].name,
                    'class': getStyleString(data[i].className)
                });
                Donut.data(arc, data[i]);
                svg.appendChild(arc);
            }
        }

        //Move all children of the parent element into the new container
        if (el) {
            while (el.firstChild) {
                div.appendChild(el.firstChild);
            }
            el.appendChild(div)
        }

        return div;
    };

    if (IE) {
        doc.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
        doc.createStyleSheet().cssText = 'v\\:arc,v\\:fill{behavior:url(#default#VML);display:inline-block;position:absolute;}';
    }

    Donut.data = function (arc, data) {
        if (typeof data === 'undefined') {
            return donutData[arc._DONUT];
        } else {
            donutData[arc._DONUT = arc._DONUT || ++dataIndex] = data;
            return arc;
        }
    };

    Donut.setColor = function (arc, color) {
        if (IE) {
            arc.strokecolor = color; // setAttribute doesn't work second time
        } else {
            arc.setAttribute('stroke', color);
        }

        return arc;
    };

    if (typeof define == 'function' && define.amd) {
        define(function () {
            return Donut;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = Donut;
    }

    root.Donut = Donut;

}).call(this);
