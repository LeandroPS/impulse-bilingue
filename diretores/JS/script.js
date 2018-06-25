$(function(){

  //$('main.wrapper').stellar();

  $("div.menu ul li").click(function() {

    $("div.menu ul li").removeClass("current");
    $(this).addClass("current");

    //console.log($($(this).attr("data-target")).first().offset().top);

//    $('body').animate({
//        scrollTop: 2000
//    }, 2000);

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

  $("button.prev-item").hide();

  $("button.next-item").click(function(){
    $(this).siblings("button.prev-item").show();
    if($(this).siblings(".item.current").next(".item").size()){
      var next = $(this).siblings(".item.current").next(".item").first();
      $(this).siblings(".item.current").removeClass("current").addClass("prev");
      next.addClass("current").removeClass("next");

      if(!next.next(".item").size()){
        $(this).hide();
      }

      //$(this).parent(".items-player").css("left", -(next.index()+1)*100+"%");

      $(this).siblings(".dots").find(".dot").removeClass("current");
      $(this).siblings(".dots").find(".dot:nth-child("+(next.index()+1)+")").addClass("current");

    }
  });

  $("button.prev-item").click(function(){
    $(this).siblings("button.next-item").show();
    if(!$(this).siblings(".item.current").is(":first-child")){
      var prev = $(this).siblings(".item.current").prev(".item").first();
      $(this).siblings(".item.current").removeClass("current").addClass("next");
      prev.addClass("current").removeClass("prev");

      if(prev.is(":first-child")){
        $(this).hide();
      }

      //$(this).parent(".items-player").css("left", -(next.index()+1)*100+"%");

      $(this).siblings(".dots").find(".dot").removeClass("current");
      $(this).siblings(".dots").find(".dot:nth-child("+(prev.index()+1)+")").addClass("current");

    }
  });

  $("button.see-more").click(function(){
    $(this).siblings(".shortable").addClass("long");
    $(this).addClass("disappear");
  });

  $("form.schedule").on("submit", function(e){
    e.preventDefault();
    //fbq('track', 'CompleteRegistration');

    var name = $("input.name").val();
    var email = $("input.email").val();
    var phone = $("input.phone").val();
    var school = $("input.school").val();

    $("form.schedule button, form.schedule input").prop('disabled', true);
    $("form.schedule div.fields").addClass("blur");

    //$("div.feedback").addClass("show");

    emailjs.send("gmail", "site_impulse_bilingue", {name: name, email: email, phone: phone, school: school})
		.then(function(response) {
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

    $("form.contact").on("submit", function(e){
    e.preventDefault();
    //fbq('track', 'CompleteRegistration');

    var name = $("input.name").val();
    var email = $("input.email").val();
    var phone = $("input.phone").val();
    var school = $("input.school").val();

    $("form.contact button, form.schedule input").prop('disabled', true);
    $("form.contact div.fields").addClass("blur");

    //$("div.feedback").addClass("show");

    emailjs.send("gmail", "site_impulse_bilingue", {to: "diretores", name: name, email: email, phone: phone, school: school}).then(function(response) {
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
});
