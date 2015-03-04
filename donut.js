(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.donut = factory();
    }
})(this, function () {
    var doc = document,
        M = Math,
        IE = doc.documentMode < 9,
        donutData = {},
        dataIndex = 0,
        donut = function (options) {
            var div = doc.createElement('div'),
                size = options.size || 100,
                data = options.data || [{value: 1}],
                weight = options.weight || 20,
                el = document.getElementById(options.container) || document.getElementsByClassName(options.container)[0] || null,
                r = size / 2,
                innerContent = options.innerContent,
                PI = M.PI,
                sin = M.sin,
                cos = M.cos,
                sum = 0,
                i,
                value,
                arc,
                setAttribute = function (el, o) {
                    for (j in o) {
                        el.setAttribute(j, o[j]);
                    }
                };

            for (i = 0; i < data.length; i++) {
                sum += data[i].value;
            }

            div.className = options.className || 'donut';
            //div.style.width = div.style.height = size + 'px';

            if (IE) {
                size -= weight;

                var fault = options.fault !== undefined ? options.fault : weight / size * 3, // fault is heuristic value of arc size deviation
                    startAngle = -fault,
                    arcStyle,
                    fill;

                for (i = 0; i < data.length; i++) {
                    value = data[i].value / sum;
                    arc = doc.createElement('<v:arc>');

                    fill = doc.createElement('<v:fill>');
                    fill.opacity = 0;

                    arc.appendChild(fill);
                    var classes = ['donut-arc'];
                    var extraClass = data[i].class;
                    if (extraClass) {
                        classes.append(extraClass);
                    }
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
                        'class': classes.join(' ')
                    });

                    donut.data(arc, data[i]);
                    div.appendChild(arc);
                }
            } else {
                var NS = 'http://www.w3.org/2000/svg',
                    svg = doc.createElementNS(NS, 'svg'),
                    startAngle = -PI / 2,
                    arcRadius = r - weight / 2;

                if (options.responsive) {
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
                        'class': 'donut-arc'
                    });
                    donut.data(arc, data[i]);
                    svg.appendChild(arc);
                }
            }

            if (innerContent && innerContent.content) {
                var innerClass  = innerContent.className || 'inner-text';
                var innerTextNode = document.createElement('div');
                innerTextNode.setAttribute("class", innerClass);
                innerTextNode.innerHTML = innerContent.content;
                div.appendChild(innerTextNode);
            }

            if (el) {
                el.appendChild(div)
            }

            return div;
        };

    if (IE) {
        doc.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
        doc.createStyleSheet().cssText = 'v\\:arc,v\\:fill{behavior:url(#default#VML);display:inline-block;position:absolute;}';
    }

    donut.data = function (arc, data) {
        if (typeof data === 'undefined') {
            return donutData[arc._DONUT];
        } else {
            donutData[arc._DONUT = arc._DONUT || ++dataIndex] = data;
            return arc;
        }
    };

    donut.setColor = function (arc, color) {
        if (IE) {
            arc.strokecolor = color; // setAttribute doesn't work second time
        } else {
            arc.setAttribute('stroke', color);
        }

        return arc;
    };

    return donut;
});
