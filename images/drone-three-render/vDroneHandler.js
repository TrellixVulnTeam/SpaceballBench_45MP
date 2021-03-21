import vCamera from "./vCamera.js"

class vDroneHandler{

    constructor(camera_width,camera_height) {
        this.vCamera = new vCamera(camera_width, camera_height)

        this.orientation = { // Euler Angles
            x: 0,
            y: 0,
            z: 0
        }

        this.location = {
            x: 0,
            y: 0,
            z: 0
        }

        this.luminosity = 0;

        this.speed = 0; // units/second
    }

    getNewFrame(){
        return this.vCamera.renderFrame().getFrame();
    }

    getSensors(){
        return {
            location: this.location,
            orientation: this.orientation,
            luminosity: this.luminosity,
            speed: this.speed
        }
    }

    translateZ(distance_units){
        this.location.z += distance_units;
        this.vCamera.translateZ(distance_units)
    }

    translateX(distance_units){
        this.location.x += distance_units;
        this.vCamera.translateX(distance_units)
    }

    translateY(distance_units){
        this.location.y += distance_units;
        this.vCamera.translateY(distance_units)
    }

    move(type, axis, val){
        this[type][axis] = val;
        this.vCamera.setTarget(this.location, this.orientation);
    }

    setSpeed(value){
        this.speed = value
    }

    saveFrameToFile(filename, type){
        if(type === "ppm") this.vCamera.frameToP3File(filename);
        if(type === "jpg") this.vCamera.frameToJPGFile(filename);
        else return "wrong type";
    }

    getJPGFrame(){
        return this.vCamera.frameToJPG();
    }

}

export default vDroneHandler;