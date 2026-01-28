// jQuery is a fast, small, and feature-rich JavaScript library. 
// It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
// A $ sign to define/access jQuery
// A (selector) to "query (or find)" HTML elements
// A jQuery action() to be performed on the element(s)
// Examples:

// $(this).hide() - hides the current element.

// $("p").hide() - hides all <p> elements.

// $(".test").hide() - hides all elements with class="test".

// $("#test").hide() - hides the element with id="test".



// The $(document).ready() method allows us to execute a function when the document is fully loaded. 

// $(document).ready(function(){
//   $("#btn_hide").click(function(){
   
//     $("#second").toggle(2000, function()
// {
//     console.log("Toggle done or finished");
// }
// );
//   });
// });

// $(document).ready(function(){
//   $("#fadding_effect").click(function(){
   
//    // $("#third").fadeOut();
//     $("#third").fadeTo("slow",0.5);
//   });
// });

// $(document).ready(function(){
//   $("#Box").click(function(){
   
//    // $("#third").fadeOut();
//     $(".box").animate({
//         width : "+=200px",
//         height : "200px",
//         fontSize : "20px"
//     },"slow")
//   });
// });
$("body").keydown(function(event){
  if(event.which == 65)
  {
      $("#second").hide(2000,function(){console.log("Task Completed ")});
  }
   if(event.which == 68)
  {
      $("#second").show(2000,function(){console.log("Task Completed ")});
  }
   
console.log(event.which);
});