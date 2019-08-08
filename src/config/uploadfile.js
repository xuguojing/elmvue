export default  (url,file)=>{
    return new Promise((resolve,reject)=>{
       let formdata = new FormData();
    formdata.append('file',file);
    var xhr = new XMLHttpRequest();
    xhr.open("post",url)
    xhr.onreadystatechange = function () {
        if (xhr.readyState==4 && xhr.status==200){
            resolve(xhr.responseText);
        }
    }
    xhr.send(formdata);
    })
}