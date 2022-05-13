
varying vec2 v_uv;


uniform sampler2D texture;
uniform float fire_height;

void main() {
   


    float height = texture2D(texture,uv).r;    // get the green value

    vec3 pos = position + height*normal *fire_height;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

    v_uv = uv;
}
