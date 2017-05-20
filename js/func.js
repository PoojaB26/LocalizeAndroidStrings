/**
 * Created by pblead26 on 20-May-17.
 */
document.getElementById("btn").onclick = function() {translateStrings()};


function translateStrings()
{
    $.get("https://translation.googleapis.com/language/translate/v2",
        {
            key:"AIzaSyAMSXXWXHQFSxvTIDvAVbTyJs7Ujoojig0",
            source:"en",
            target:"fr",
            q:$("#text").val()

        },
        function(response)
        {
            //$("#translated").html(response.data.translations[0].translatedText);
            console.log(response);
            var doc = document.getElementById("translated") ;
            doc.innerHTML=doc.innerHTML + "<br>"+ '&#60;'+'string name="test_text"'+'&#62;'+ response.data.translations[0].translatedText+ "&#60;/string&#62;";

        },"json") .fail(function(jqXHR, textStatus, errorThrown)
    {
        alert( "error :"+errorThrown );
        console.log(errorThrown);

    });
}
