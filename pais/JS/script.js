$(function(){
  var second_section;

  $("div.menu ul li").click(function() {
    document.getElementById($(this).attr("data-target")).scrollIntoView({block: 'start', behavior: 'smooth'});
  });

  $(".items-player").each(function(){
    var dots_number = $(this).children(".item").size();
    $(this).find(".dots").empty();
    for(var i = 0; i<dots_number;i++){
      $(this).find(".dots").append("<div class='dot "+(i==0?"current":"")+"'></div>");
    }
    console.log(dots_number);
  });

  $("button.prev-item").css({opacity: 0, visibility: "hidden"});

  $("button.next-item").click(function(){
    $(this).siblings("button.prev-item").css({opacity: 1, visibility: "visible"});
    if($(this).siblings(".item.current").next(".item").size()){
      var next = $(this).siblings(".item.current").next(".item").first();
      $(this).siblings(".item.current").removeClass("current").addClass("prev");
      next.addClass("current").removeClass("next");

      if(!next.next(".item").size()){
        $(this).css({opacity: 0, visibility: "hidden"});
      }

      //$(this).parent(".items-player").css("left", -(next.index()+1)*100+"%");

      $(this).siblings(".dots").find(".dot").removeClass("current");
      $(this).siblings(".dots").find(".dot:nth-child("+(next.index()+1)+")").addClass("current");

    }
  });

  $("button.prev-item").click(function(){
    $(this).siblings("button.next-item").css({opacity: 1, visibility: "visible"});
    if(!$(this).siblings(".item.current").is(":first-child")){
      var prev = $(this).siblings(".item.current").prev(".item").first();
      $(this).siblings(".item.current").removeClass("current").addClass("next");
      prev.addClass("current").removeClass("prev");

      if(prev.is(":first-child")){
        $(this).css({opacity: 0, visibility: "hidden"});
      }

      //$(this).parent(".items-player").css("left", -(next.index()+1)*100+"%");

      $(this).siblings(".dots").find(".dot").removeClass("current");
      $(this).siblings(".dots").find(".dot:nth-child("+(prev.index()+1)+")").addClass("current");

    }
  });

  $("button.see-more").click(function(){
    $(this).parents(".shortable").addClass("long");
    $(this).addClass("disappear");
  });

  $("form.contact").on("submit", function(e){
    e.preventDefault();
    //fbq('track', 'CompleteRegistration');

    var name = $("input.name").val();
    var email = $("input.email").val();
    var phone = $("input.phone").val();
    var school = $("input.school").val();
    var message = $("textarea.message").val();

    $("form.contact button, form.schedule input").prop('disabled', true);
    $("form.contact div.fields").addClass("blur");

    //$("div.feedback").addClass("show");

    emailjs.send("gmail", "site_impulse_bilingue", {to: "pais", name: name, email: email, phone: phone, school: school, message: message}).then(function(response) {
      $("div.feedback h1").text("Obrigado");
      $("div.feedback h2").text("A gente recebeu seu contato e responderemos em breve!");
      $("div.feedback").addClass("show");

    }, function(err) {
      console.log("FAILED. error=", err);
      $("div.feedback h1").text("Algo deu errado");
      $("div.feedback h2").text("Algo deu errado no envio do seu contato, verifique sua conexão e tente novamente mais tarde ");
      $("div.feedback").addClass("show");
    });

    return false;
  });


  $(window).on("resize", function(){
    second_section = $("section#know-more").offset().top - ($(window).height()/2) - ($("section#know-more").height()/2);
  });

  $(window).on("scroll", function(){
    if($(window).scrollTop() >= second_section)  $("section#know-more").addClass("animation-start");
  });

  $(window).trigger("resize");

});
