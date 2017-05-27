/**
 * Created by pblead26 on 20-May-17.
 */
document.getElementById("btn").onclick = function() {translateStrings()};


function translateStrings(value, key)
{
    $.get("https://translation.googleapis.com/language/translate/v2",
        {
            key:"AIzaSyAMSXXWXHQFSxvTIDvAVbTyJs7Ujoojig0",
            source:"en",
            target:"hi",
            q:value

        },
        function(response)
        {
            //$("#translated").html(response.data.translations[0].translatedText);
            console.log(response);
            var doc = document.getElementById("translated") ;
            doc.innerHTML=doc.innerHTML + "<br>"+ '&#60;'+'string name="'+key+'"'+'&#62;'+ response.data.translations[0].translatedText+ "&#60;/string&#62;";

        },"json") .fail(function(jqXHR, textStatus, errorThrown)
    {
        alert( "error :"+errorThrown );
        console.log(errorThrown);

    });
}

var readFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        var node = document.getElementById('file-output');
        node.innerText = text;
        regex(text);
        console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
};


function regex(text){
    var Regexp = /(<string name=")([a-zA-Z0-9_]*)(">)(.*)(<\/string>)/g;
    while ((match = Regexp.exec(text)) != null) {
        var key = match[2];
        var value = match[4];
        console.log(name + " " + value);
        translateStrings(value, key);
    }

}