
export function hideModal(nameModal : string) {
    const myModalAddProcess = document.getElementById(nameModal);
    if (myModalAddProcess) {
        document.getElementsByClassName('modal-backdrop')[0].remove();    
        myModalAddProcess.style.display = "none";
        myModalAddProcess.ariaHidden = "true";
        myModalAddProcess.className = "modal fade";
    }

    let body = document.body;
    if(body){
        body.className = "";
    }
}  

