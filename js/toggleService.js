app.service("toggleService",function () {
    this.hideNav=false;
    this.hideProyectos=true;
    this.hideVentana=false;

    this.toggleSideNav=function () {
        if(this.hideNav){
            this.hideNav=false;
        }else{
            this.hideNav=true;
        }
    }

    this.toggleProyectos=function () {
        if(this.hideProyectos){
            this.hideProyectos=false;
        }else{
            this.hideProyectos=true;
        }
    }

    this.toggleVentana=function () {
        if(this.hideVentana){
            this.hideVentana=false;
        }else{
            this.hideVentana=true;
        }
    }
});
