<<<<<<< HEAD
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorSepia = color;
	colorSepia.r = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.g = colorSepia.r;
	colorSepia.b = colorSepia.r;

	gl_FragColor = colorSepia;
=======
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorSepia = color;
	colorSepia.r = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.g = colorSepia.r;
	colorSepia.b = colorSepia.r;

	gl_FragColor = colorSepia;
>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
}