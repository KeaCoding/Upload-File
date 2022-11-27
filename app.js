$(document).ready(function(){
    EventChange();
});

var arryInfoFile = [];

function EventChange(){
    $("#ip-file").on("change",function(){
        var v = $(this);

        if(v[0].files.length > 0){
            arryInfoFile.push({
                id:uuidv4(),
                f:v[0].files[0]
            });
        }

        LoadInfoFile(arryInfoFile);
    });

    $(".btn-submit").on('click',function(){
        CreateProcess();

        var width = 1;
        
        var frame = setInterval(LoadFrame,20);
        function LoadFrame(){
            if(width >= 100){
                width = 1;
                clearInterval(frame);
                OpenModal("#md-info-file");
                LoadImage(arryInfoFile);
                Refresh();
            }else{
                width++;
                $("#process-file").val(width);
            }
        }
    });
}

function OpenModal(id){
    $(id).modal('show');
}

function CloseModal(id){
    $(id).modal('hide');
}

function CreateProcess(){
    var html = '<progress id="process-file" max="100"></progress>';
    $(".box-process").html(html);
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function LoadInfoFile(arrayInfoFile){
    var html = "";

    if(arrayInfoFile.length <= 0){
        $(".info-file ul").html(html);
    }

    arrayInfoFile.forEach(x=>{
        html += '<li>';

        html += '<span>';
        html += '<i class="fa fa-file-image-o" aria-hidden="true"></i> ';
        html += x.f.name + ' | ' + formatBytes(x.f.size);
        html += '</span>';
        html += '<button onclick="EventChangeDeleteFile(\'' + x.id +'\')"><i class="fa fa-trash" aria-hidden="true"></i></button>';

        html += '</li>';
    });

    $(".info-file ul").html(html);
}

function EventChangeDeleteFile(id){
    var result = [];

    arryInfoFile.forEach(x=>{
        if(x.id != id){
            result.push(x);
        }
    });

    arryInfoFile = result;

    LoadInfoFile(arryInfoFile);
}

function LoadImage(arryInfoFile){

    if(arryInfoFile.length <= 0){
        $("#md-info-file .modal-body").html("");
        return false;
    }

    $("#md-info-file .modal-body").html("");

    arryInfoFile.forEach(x=>{
        var reader = new FileReader();

        reader.onload = function(e){
            var html = '<img class="img-thumbnail" src="'+ e.target.result +'" width="150px" height="150px" />';
            $("#md-info-file .modal-body").append(html);
        }

        if(x.f){
            reader.readAsDataURL(x.f);
        }
    });
}

function Refresh(){
    arryInfoFile = [];
    $(".box-process").html("");
    $("#ip-file").val("");
    $(".info-file ul").html("");
}

