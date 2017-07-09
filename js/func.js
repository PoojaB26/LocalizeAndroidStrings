/**
 * Created by pblead26 on 20-May-17.
 */
$( document ).ready(function() {
    console.log( "ready!" );
    hideDiv();



//document.getElementById("btn").onclick = function() {translateStrings()};
$( function() {
    var availableTags = [
        "en",
        "hi",
        "ta",
        "te",
        "ml"

    ];
    $( "#locale" ).autocomplete({
        source: availableTags,
        messages: {
            noResults: '',
            results: function() {}
        }
    });
} );

});

function hideDiv() {
    document.getElementById('result').style.display = "none";
    console.log("HSE");
}


function showDiv() {
    document.getElementById('result').style.display = "block";
    console.log("HE");
}

function translateStrings(value, key)
{
    showDiv();
    var target_value = document.getElementById("locale").value;
    $.get("https://translation.googleapis.com/language/translate/v2",
        {
            key:"AIzaSyAMSXXWXHQFSxvTIDvAVbTyJs7Ujoojig0",
            source:"en",
            target:target_value,
            q:value

        },
        function(response)
        {
            //$("#translated").html(response.data.translations[0].translatedText);
            console.log(response);
            var doc = document.getElementById("translated");
            var check_text = document.getElementById("check");
            doc.innerHTML=doc.innerHTML + '&#60;'+'string name="'+key+'"'+'&#62;'+ response.data.translations[0].translatedText+ "&#60;/string&#62;" + "<br>";
            check_text.innerHTML = check_text.innerHTML + value + " :" + response.data.translations[0].translatedText + "<br>";
        },"json") .fail(function(jqXHR, textStatus, errorThrown)
    {
        alert( "error :"+errorThrown );
        console.log(errorThrown);

    });

    document.getElementById("spinner").style.display = 'none';
}

function readFile (event) {
   // result_div.style.display = "block";
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
}


function regex(text){
    i = 0;
    if(i < 100) {


        var Regexp = /(<string name=")([a-zA-Z0-9_]*)(">)(.*)(<\/string>)/g;
        while ((match = Regexp.exec(text)) != null) {
            var key = match[2];
            var value = match[4];
            console.log(name + " " + value);
            translateStrings(value, key);
            i = i + 1;
            $(".progress-bar").css("width", i + "%").text(i + " %");

        }
        console.log("DONE");
    }

}

function copyToClipboard() {
    var text = $(".translated").val();
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

function copyAll(){
    $("#value-container").focus(function() { $(this).select(); } );

}

