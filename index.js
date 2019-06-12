var fs = require('fs');
const maps = require('./maps.json');
const { createCanvas, loadImage } = require('canvas');

for (var name in maps) {
    var map = maps[name];
    var fileName = './img/' + name + '.png';
    const c = createCanvas(map.map.width, map.map.height);
    const ctx = c.getContext('2d');
    ctx.font = '100px Verdana';

    ctx.beginPath();
    ctx.rect(0, 0, map.map.width, map.map.height);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = map.map.margin;
    ctx.fill();
    ctx.stroke();

    for (var i in map.figures) {
        var figure = map.figures[i];
	ctx.beginPath();
	ctx.rect(figure.x, figure.y, figure.width, figure.height);

        switch (figure.type) {
            case "start":
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
	        ctx.fillStyle = "black";
                ctx.fillText("S", figure.x + (figure.width - ctx.measureText('S').width) / 2, figure.y + 120);
            break;
            case "end":
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = "black";
                ctx.fillText("B", figure.x + (figure.width - ctx.measureText('B').width) / 2, figure.y + 150);   
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
