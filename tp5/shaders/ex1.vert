<<<<<<< HEAD
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;


void main() {
	vec3 offset=vec3(1.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset=offset*normScale*0.1*sin(timeFactor);

	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1 + offset, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	normal = vec4(aVertexNormal, 1.0);

	coords=gl_Position;
}
=======
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;


void main() {
	vec3 offset=vec3(1.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	offset=offset*normScale*0.1*sin(timeFactor);

	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1 + offset, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	normal = vec4(aVertexNormal, 1.0);

	coords=gl_Position;
}
>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
