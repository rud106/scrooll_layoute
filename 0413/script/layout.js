$(function(){

    $('.title > h1').css({
    'opacity':'0',
    'left':'-1000px'
  }).animate({'opacity':'1','left':'0px'},500);

  $('.title p').css('right','-100%').delay(300).animate({'right':'0px'},500);

  // 1. 네비게이션이 상단으로 떨어진값을 변수에 저장한다.
  const nav_Offset = $('.gnb').offset().top;
  console.log(nav_Offset); //세로 값 890

  $(window).scroll(function(){ //화면을 스크롤 동작하면 아래 내용을 실행

    let sPos = $(this).scrollTop(); //현재 세로스크롤값을 변수에 담는다
    console.log(sPos);

    // 스크롤값이 880이상일떄 프로필 페이지 4개 박스가 서서히 올라오며 나타남
    if(sPos>=880){
      $('.photo01').animate({'top':'220px','opacity':'1'},500);
      $('.info01').animate({'top':'220px','opacity':'1'},500);
      $('.info02').delay(300).animate({'top':'550px','opacity':'1'},500);
      $('.info03').delay(300).animate({'top':'550px','opacity':'1'},500);
    }

    if(nav_Offset<=sPos){  //만약 내비게이션 높이가 스크롤값보다 작거나 같으면
      $('.gnb').addClass('act'); //서식을 적용하고 고저하고
    }else{
      $('.gnb').removeClass('act');  // 그렇지 않으면 제거한다.
    }

    // 1번째 방법 - 스크롤 동작시 각각 해당 아티클이 보일때 메뉴에 on서식 적용하기
  //   if(sPos >=300&&sPos <=1140){
  //     $('.gnb li').eq(0).find('a').addClass('on');
  //   }else if(sPos >=1150&&sPos<=2020){
  //     $('.gnb li').eq(1).find('a').addClass('on');
  //   }else if(sPos >=2030&&sPos<=2960){
  //     $('.gnb li').eq(2).find('a').addClass('on');
  //   }else if(sPos >=2980&&sPos<=3860){
  //     $('.gnb li').eq(3).find('a').addClass('on');
  //   }else if(sPos >=3880&&sPos<=4000){
  //     $('.gnb li').eq(4).find('a').addClass('on');
  //   }else{
  //     $('.gnb li').find('a').removeClass('on');
  //   }
  //   $('.gnb li a').removeClass('on');
  // });


  $('.gnb li a').removeClass('on'); //기본에 메뉴에 적용된 서식이 있다면 on 제거
  // 2번쨰 방법 - 만약 아티클의 높이값이 세로스크롤 값 영역과 비교하여 해당 메뉴에 서식on적용
  $('section article').each(function(i){ //each 각각 기능을 넣는다
    let top = $(this).offset().top-400; //내가 선택한 article의 위치를 각각 변수에 대입한다.

    if(sPos>=top){
      $('.gnb li a').removeClass('on'); //모든 메뉴에 on클래스 서식을 제거하고
      $('.gnb li').eq(i).find('a').addClass('on'); //해당하는 메뉴에 on클래스 서식을 적용
    }
   });
  });


  // 내비게이션 클릭시 해당콘텐츠로 이동하기
  const gnb = $('.g-gnb ul > li');
  gnb.click(function(){
    let n = $(this).index();
    console.log(n);
    
    $('html, body').stop().animate({scrollTop:$('section article').eq(n).offset().top},500);
    return false;
  });
  
  $(function(){

    // 갤러리 밑에 메뉴버튼 클릭시 색상변화
    $('.g-gnb > ul > li:first-child > a').addClass('act');

    $('.g-gnb > ul > li > a').click(function(){
      $('.g-gnb a').removeClass('act');
      $(this).addClass('act');

      // $(this).addClass('act').parent().siblings().find(a).removeClass('act');
      return false;
    });

    // 메뉴클릭시 선택한 메뉴사진만 보이기
    const total_mnu = $('.g-gnb > ul > li:first-child a');
    const pro_btn = $('.g-gnb > ul > li:nth-child(2) a');
    const proce_btn = $('.g-gnb > ul > li:nth-child(3) a');
    const de_btn = $('.g-gnb > ul > li:nth-child(4) > a');
    const co_btn = $('.g-gnb > ul > li:last-child > a');

    total_mnu.click(function(){
      $('.total').hide();
      $('.total').fadeIn();
    });

    pro_btn.click(function(){
      $('.total').hide(); // 메뉴의 버튼 클릭시 전체를 숨기고
      // $('.project').show();
      $('.project').fadeIn(); //누른 버튼의 클래스만 나오게하기
    });

    proce_btn.click(function(){
      $('.total').hide();
      $('.process').fadeIn();
    });

    de_btn.click(function(){
      $('.total').hide();
      $('.design').fadeIn();
    });

    co_btn.click(function(){
      $('.total').hide();
      $('.coding').fadeIn();
    });

    // 갤러리 이미지 목록(li)에 마우스 오버시 캡션 나오게하기
    $('.g_list li').mouseenter(function(){ //마우스 오비시 작동
      $(this).find('.caption').stop().animate({'bottom':'0px'},300); //마우스 올린 li태그 자손 caption을 찾아 작동
    });

    $('.g_list li').mouseleave(function(){ //마우스 아웃이 동작
      $('.caption').stop().animate({'bottom':'-40px'},300);
    });

    // 목록안에 img태그의 src값 불러오기
    $('.g_list li').click(function(){
      const img_url = $(this).find('img').attr('src');
      console.log(img_url); //이미지 src속성값이 출력되는지 확인하기
      const title = $(this).find('.caption').text(); //캡션에 있는 텍스트값을 변수에 담는다.
      console.log(title);

      

      let modal = "<div class='modal'><div><h3>"+title+"</h3><img src="+img_url+"><br><a href='#' title=''><i class='fas fa-times'></i></a></div></div>";

      // 모달서식
      $('body').append(modal); //이미지를 body태그 안쪽의 뒤에 나오게 한다.

      const img_h = $(this).find('img').height();
      console.log(img_h);
      $('.modal h3').css({
        'position':'absolute',
        'top':img_h,
        'z-index':'1000'
      });


      // 닫기 버튼 클릭시 모달윈도 숨기기
      $('.modal a').click(function(){
        $('.modal').fadeOut();
        return false; //#기능 새로고침 방지
      });


    });

  });

});