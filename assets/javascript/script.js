zip = 5;

function sideOpen() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function sideClose() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$("#continue").on("click", function (){
	$("#firstOverlay").slideUp(1500);
})

$("#homeButton").on("click", function(){
    $("#home").show();
    $("#howTo").hide();
    $("#contact").hide();
});

$("#howToButton").on("click", function(){
    $("#home").hide();
    $("#howTo").show();
    $("#contact").hide();
});

$("#contactButton").on("click", function(){
    $("#home").hide();
    $("#howTo").hide();
    $("#contact").show();
});

$("#howTo").hide();
$("#contact").hide();
$("#continue").prop("disabled", true);

$("#inputField").on("keyup", function() {
  $("#continue").prop("disabled", false);
  if( $("#inputField").val() == '') {
    $("#continue").prop("disabled", true);
 }
});