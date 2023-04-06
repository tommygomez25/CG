#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

varying vec2 vTextureCoord;

void main() {
	if (coords.y > 0.5)
		gl_FragColor =  vec4(1.0, 1.0, 0.0, 1.0);
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
	}
}