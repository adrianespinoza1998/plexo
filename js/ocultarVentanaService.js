app.service("ocultarVentanaService",function () {
    this.ocultar=false;

    this.ocultarVentana=function () {
        if(this.ocultar){
            this.ocultar=false;
        }else{
            this.ocultar=true;
        }
    }
});
