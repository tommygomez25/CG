<<<<<<< HEAD
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
	gl_FragColor = texture2D(uSampler, vTextureCoord);
}


=======
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
	gl_FragColor = texture2D(uSampler, vTextureCoord);
}


>>>>>>> 114ccd77442d27100c585f7492fc7184916f5643
