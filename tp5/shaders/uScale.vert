<<<<<<< HEAD
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);
}
=======
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);
}
>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
