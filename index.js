var fs = require('fs');
const maps = require('./maps.json');
const { createCanvas, loadImage } = require('canvas');

for (var name in maps) {
    var map = maps[name];
    var fileName = './img/' + name + '.png';
    var m = map.map.margin;
    var w = map.map.width + m * 2;
    var h = map.map.height + m * 2;
    const c = createCanvas(w, h);
    const ctx = c.getContext('2d');
    ctx.font = '100px Verdana';

    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.lineWidth = m * 2;
    ctx.fill();
    ctx.stroke();

    for (var i in map.figures) {
        var figure = map.figures[i];
	ctx.beginPath();
	ctx.rect(
            figure.x + m,
            figure.y + m,
            figure.width,
            figure.height
        );

        switch (figure.type) {
            case "start":
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
	        ctx.fillStyle = "black";
                ctx.fillText("S", figure.x + m + (figure.width - ctx.measureText('S').width) / 2, figure.y + m + 120);
            break;
            case "end":
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = "black";
                ctx.fillText("B", figure.x + m + (figure.width - ctx.measureText('B').width) / 2, figure.y + m + 150);   
            break;
            case "figure":
                ctx.fillStyle = 'red';
                ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";
                ctx.stroke();
            break;
	}
    }

    const out = fs.createWriteStream(fileName);
    const stream = c.createPNGStream();
    stream.pipe(out);
}
