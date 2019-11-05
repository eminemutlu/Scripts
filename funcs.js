	
	var menuAminateTimer=null;
	var menuWidthToGo=316;
	var menuWidth=316;
	var activeDiv="activediv";
	var g_pageid;
	var g_imgWidths=new Array();
	var g_divStartPos;
	var g_divPos0;
	var g_divPos;
	var g_divPosFrom;
	var g_divPosToGo;
	var g_MoveCounter;
	var totalwidth;
	var imgScrollTimer=null;
	var navigation1=1103;
	var navigation2=1103;
	var minWindowWidth=1109;

	function ClearArray()
	{
		itemCount=g_imgWidths.length-1;
		for (i1=0;i1<itemCount;i1++)
			g_imgWidths.pop();
	}

	function ImgScroll()
	{
		
		dx=(g_divPosToGo-g_divPos);
		g_divPos+=dx/50;
		if (Math.abs(g_divPos-g_divPosToGo) < 2)
		{
			g_divPos=g_divPosToGo;
			g_MoveCounter=0;
		}
		
		if (g_divPos > g_divPos0)
		{
			str=g_divPos+" "+g_divPosToGo+">>";
			g_divPos-=totalwidth/3;
			g_divPosToGo-=totalwidth/3;		
			str+=g_divPos+" "+g_divPosToGo;
		}
		if (g_divPos < g_divPos0-totalwidth/3)
		{
			g_divPos+=totalwidth/3;
			g_divPosToGo+=totalwidth/3 ;			
		}
		$("#"+activeDiv+"-galery").css("margin-left",Math.round(g_divPos));
		if (g_divPos == g_divPosToGo)
		{
			if (g_pageid != 3)	Next_Img();
		}//if (g_divPos == g_divPosToGo)
		else
		{
			imgScrollTimer=setTimeout("ImgScroll()",10);
		}
	}
	
	
	
	function ActivateTimer()
	{
		clearTimeout(menuAminateTimer);
		menuAminateTimer=setTimeout("MenuAnimateControl()",100);
	}
	
	function MenuAnimateControl()
	{
		if (menuWidth != menuWidthToGo)
		{
			
			if (Math.abs(menuWidth-menuWidthToGo) < 3)
				var wToGo=menuWidthToGo;
			else
			{
				var dx=menuWidthToGo-menuWidth;
				
				var wToGo=menuWidth+(dx*0.4);
			}
			menuWidth=wToGo;
			$('.couvert-couvert').width(Math.round(menuWidth));
		}//if (menuWidth != menuWidthToGo)
		ActivateTimer();
	}
	
	
	ActivateTimer();

	function pageLoad(id,toplamwidth,lng,pgid,count,imgWidth,newyearsid,newpageid)
	{
		g_pageid=id;
		$.ajax({
			type:"GET",
			cache:false,
			url:"../pages/pageload.php",	
			data:"id="+id+"&lng="+lng+"&pgid="+pgid+"&calltype=1&pid="+newyearsid+"&pg="+newpageid,  
			success: function(msg)
			{
				load_success(msg,id,toplamwidth,lng,pgid,count,imgWidth,newyearsid,newpageid);
			},
			error: function(msg)
			{

			}
		});
	}


	function load_success(msg,id,toplamwidth,lng,pgid,count,imgWidth,newyearsid,newpageid)
	{
		browserwidth=$(window).width();
		if(browserwidth >=0) { 
			$(".tdmenu").css("width",navigation1+"px");
			$(".menu").css("width",navigation1+"px");
			$(".right-menu").css("display", "block");
			$(".right-menu-mini").css("display", "none");
		} else {
			$(".tdmenu").css("width",navigation2+"px");
			$(".menu").css("width",navigation2+"px"); 
			$(".right-menu").css("display", "none");
			$(".right-menu-mini").css("display", "block");
		}
		if(browserwidth >=1109) { navWidth=navigation1; } else { navWidth=navigation2; }
		browserwidthnav=browserwidth-navWidth;
		if(browserwidth < minWindowWidth){browserwidthnav=minWindowWidth-navWidth;}
		browserwidth2=browserwidthnav/2;
			if(id == 0) {
				value=msg;
			} else {
				str=msg.split("&#&");
				if(id == 3)
				{
					totalwidth0 = str[1].replace('<div id="widthTotal_div">', '');
					totalwidth1 = totalwidth0.replace('</div>', ''); 
					totalwidth=totalwidth1;
					
					imgWidth0 = str[3].replace('<div id="imgWidth_div">', '');
					imgWidth1 = imgWidth0.replace('</div>', '');
					imgWidth=imgWidth1;
					
					value=str[2];
					
					str2=imgWidth.split(",");
					
					ClearArray();
					for(i2=0; i2<str2.length; i2++)
					{
						g_imgWidths[i2]=str2[i2];
					}
				} else {
				
					totalwidth=str[1];
					value=str[2];
					imgWidth=str[3];
					
					str2=imgWidth.split(",");
					
					ClearArray();
					for(i2=0; i2<str2.length; i2++)
					{
						g_imgWidths[i2]=str2[i2];
					}
				}//if(id == 3),else
			}//if(id == 0) {,else
	
			if(id==0){ 
				nav=316;
				gallerywidth=toplamwidth;
				imageleft=nav+browserwidth2-Math.ceil(toplamwidth/3);
				titlewidth=(browserwidth2*1 + nav);
	
				setTimeout(function(){
				   $('.restaurant p').css({'color': '#253b47'});
				   $('.actualites p').css({'color': '#253b47'});
				   $('.contact p').css({'color': '#253b47'});
				   $('.carte p').css({'color': '#253b47'});
				}, 900);
				
				div='activediv';
				ClearArray();
				for(i2=0;i2<count; i2++)
				{
					g_imgWidths[i2]=imgWidth;
				}
			}
			if(id==1){ 
				nLeft=($(".navleft-x").width());
				nav=505;
				gallerywidth=totalwidth;
				imageleft=nav+browserwidth2-Math.ceil(totalwidth/3);
				if(browserwidth < 1109){ $(".restourant-part").css("margin-left","30px"); }
				
				if(browserwidth < minWindowWidth){
					titlewidth= minWindowWidth - ((nLeft*1) + nav);
				} else {
					titlewidth= browserwidth - ((nLeft*1) + nav);
				}
				
				setTimeout(function(){
				   $('.restaurant p').css({'color': '#ffffff'});
				}, 500);
				setTimeout(function(){
				   $('.actualites p').css({'color': '#253b47'});
				   $('.contact p').css({'color': '#253b47'});
				   $('.carte p').css({'color': '#253b47'});
				}, 200);
				
				div='retourantdiv';
			}
			if(id==2){ 
				nav=608;
				gallerywidth=totalwidth;
				if($.browser.safari){
					imageleft=nav + (browserwidth2 - 1);
				} else {
					imageleft=nav + browserwidth2;
				}
				titlewidth=(browserwidth2*1 + nav);
				setTimeout(function(){
				   $('.carte p').css({'color': '#ffffff'});
				}, 500);
				setTimeout(function(){
				   $('.restaurant p').css({'color': '#253b47'});
				   $('.actualites p').css({'color': '#253b47'});
				   $('.contact p').css({'color': '#253b47'});
				}, 200);
	
				div='cartediv';
				
				
			}
			if(id==3){ 
				nav=748;
				gallerywidth=totalwidth;
				if($.browser.safari){
					imageleft=nav + (browserwidth2 - 1);
				} else {
					imageleft=nav + browserwidth2;
				}
				titlewidth=(browserwidth2*1 + nav);
				setTimeout(function(){
				   $('.actualites p').css({'color': '#ffffff'});
				}, 500);
				setTimeout(function(){
				   $('.restaurant p').css({'color': '#253b47'});
				   $('.contact p').css({'color': '#253b47'});
				   $('.carte p').css({'color': '#253b47'});
				}, 200);
				
				div='actulatiesdiv';
				
			}
			if(id==4){ 
				nav=892;
				gallerywidth=totalwidth;
				if($.browser.safari){
					imageleft=nav + (browserwidth2 - 1);
				} else {
					imageleft=nav + browserwidth2;
				}
				titlewidth=(browserwidth2*1 + nav);
				setTimeout(function(){
				   $('.contact p').css({'color': '#ffffff'});
				}, 500);
				setTimeout(function(){
				   $('.restaurant p').css({'color': '#253b47'});
				   $('.actualites p').css({'color': '#253b47'});
				   $('.carte p').css({'color': '#253b47'});
				}, 200);
				
				div='contactdiv';
			}
			
			if (value != "empty"){  $("#"+div).html(value); }
			   
			$("#"+div+"-galery").css("width", gallerywidth+"px");
			$("#"+div+"-galery").css("margin-left", imageleft+"px");
			$(".title-style").css("width", titlewidth+"px");
			
			menuWidthToGo=nav;
	
			$("#"+activeDiv).css("display","none");
			$("#"+div).css("display","block");
			
			if(id == 1)
			{
				if(browserwidth >=1109) { 
					
				} else {
					$(".restourant-part").css("margin-left", "30px");	
				}
			}
			
			
			if(id == 0)
			{
				if(browserwidth >=1212)
				{
					homeButtonLeft = $(".navleft-x").width() - 55;
					homeButtonRight = $(".nav-empty").width() - 55;
				} else {
					homeButtonLeft = $(".navleft-x").width();
					homeButtonRight = $(".nav-empty").width();
				}
				
				$("#prev").css("left", homeButtonLeft +"px");	
				$("#next").css("right", homeButtonRight+"px");	
				
				if(browserwidth >=1109) { 
					$("#htitle").css("width", "1103px");	
				} else {
					$("#htitle").css("width", "1102px");	
				}
				
				
				if($.browser.safari){
					$(".home-part").css("margin-right", "-1px");
				} else if($.browser.chrome)
				{
					$(".home-part").css("margin-right", "0");
				}
							
				$(function() {
					   $('#s4').cycle({
						fx:    'scrollDown',
						sync:   0,
						delay: -2000,
						timeout: 7000,
						cleartypeNoBg:true
					});
				});
				
			}
			if(id==3){ $("#header-menu").css("margin-left", "0px"); }
			
			if(id == 2)
			{
				if( $.client.os == "Mac" && $.client.browser == "Safari"){
					$(".dt-style p").css("padding-top","3px");	
					$(".dt-style-vins p").css("padding-top","3px");	
				
				} else if($.client.os == "Mac" && $.client.browser == "Chrome"){
					$(".dt-style p").css("padding-top","3px");
					$(".dt-style-vins p").css("padding-top","3px");	
				
				} else if($.client.os == "Mac" && $.client.browser == "Firefox"){
					$(".dt-style p").css("padding-top","2px");
					$(".dt-style-vins p").css("padding-top","2px");	
				
				} else if($.client.browser == "Chrome" || $.client.browser == "Safari"){
					$(".dt-style p").css("padding-top","2px");
					$(".dt-style-vins p").css("padding-top","2px");	
				}
			}
			
			if(id==4){
				placeholder();
				if( $.client.os == "Mac" && $.client.browser == "Safari"){
					$(".select").height(33);	
				}
			}
			
			activeDiv=div;
			g_divStartPos=imageleft;
			g_divPos=imageleft;
			g_divPos0=g_divPos;
			g_MoveCounter=0;
			g_divPosFrom=g_divPos;
			g_divPosToGo=g_divPos-g_imgWidths[0];
			totalwidth=0;
			
			for (i1=0;i1<g_imgWidths.length;i1++)
				totalwidth+=Number(g_imgWidths[i1]);
			totalwidth=totalwidth*3;
			
			clearTimeout(imgScrollTimer);
			
			if(id != 3){
				imgScrollTimer=setTimeout("ImgScroll()",1000);
			}	
			
			if(newpageid != 0 && newyearsid != 0)
			{
				imggit=newpageid-1;
				gotoimg(imggit+g_imgWidths.length,0,0);
			}
	}

	function Get_ImgCounter()
	{
		var imgCounter,iw,tw,dx,dx2;
		dx=g_divPos-g_divPos0;
		tw=0;
		imgCounter=0;	
		for (i1=3*g_imgWidths.length-1;i1>=0;i1--)
		{
			iw=g_imgWidths[i1%g_imgWidths.length];
			tw+=Number(iw);
			dx2=Math.abs(tw-Math.abs(dx));
			if (dx2 < iw/2)
			{				
				break;
			}
			imgCounter++;
			
		}//for i1
		if (dx < 0)
			imgCounter=g_imgWidths.length+imgCounter;
		else
			imgCounter=g_imgWidths.length-imgCounter;
		return(imgCounter);
	}

	function Next_Img()
	{
		var imgCounter;
		imgCounter=Get_ImgCounter();
		imgToGo=imgCounter+1;				
		if (imgToGo >= 3*g_imgWidths.length) 
		{
			imgToGo=0;		
		}
		gotoimg(imgToGo,0,0);
	}
	
	function Prev_Img()
	{
		var imgCounter;
		imgCounter=Get_ImgCounter();
		imgToGo=imgCounter-1;
		if (imgToGo < 0) imgToGo=3* g_imgWidths.length-1;
		gotoimg(imgToGo,0,0);
	}
	
	function gotoimg(imgIndex,withT,witharr)
	{		
		var i1,dx;
		if(withT != 0 && witharr != 0)
		{
			totalwidth=withT;
			imgWidth=witharr;
			str2=imgWidth.split("-");
			ClearArray();
			for(i3=0; i3<str2.length; i3++)
			{
				g_imgWidths[i3]=str2[i3];
			}
		}
		g_imgCounter=0;
		g_MoveCounter=0;
		g_divPosFrom=g_divPos;
		dx=0;
		str="";
		for (i1=0;i1<=imgIndex;i1++)
		{
			str+=g_imgWidths[i1%g_imgWidths.length]+";";
			dx+=Number(g_imgWidths[i1%g_imgWidths.length]);
		}
		
		clearTimeout(imgScrollTimer);
		if (g_divPosToGo == g_divPos)
			imgScrollTimer=setTimeout("ImgScroll()",5000);
		else
			imgScrollTimer=setTimeout("ImgScroll()",10);
			g_divPosToGo=g_divPos0+(totalwidth/3)-dx;
	}






	function numbersonly(e){
		var unicode=e.charCode? e.charCode : e.keyCode
		if (unicode!=8 && unicode!= 9  && unicode!= 44 ){ 
		if ( unicode != 46  && unicode<48||unicode>57)
		return false 
		}
	}
	
	
	function ReserveerNu(strLanguage) {
		$.fancybox(
		{
			'hideOnContentClick': false,
			'width': 700,
			'height': 650,
			'type': 'iframe',
			'href': 'http://' + strLanguage
		});
	}


	function placeholder()
	{
		$("input[type=text],input[type=password],textarea").each(function(){
		if ($.trim($(this).attr("holder")) != "" && $.trim($(this).val() == "")) {
			var field = $(this);
			var ffield = $(field).attr("id")+"__jquery_placeholder_passwordFakeField";
			
			if ($(field).attr("type") == "password") {
				var newfield  = $("<input type='text' class='"+$(field).attr("class")+"' id='"+ffield+"' tabindex='"+$(field).attr("tabindex")+"' holder='"+$(field).attr("holder")+"' />").focus(function() {
									$(this).hide();
									$(field).show();
									$(field).focus();
								}).keypress(function(event) {
									event.preventDefault();
								});
				$(newfield).insertBefore(field);
				$(field).hide();
			}
			
			$(field).bind("focus",function() {
				$("#"+ffield).hide();
				$(field).show();
				if ($(field).hasClass("holder")) {
					$(field).val("");
					$(field).removeClass("holder");
				}
			});
			
			$(field).bind("blur",function() {
				if ($(field).val() == "") {
					if ($(field).attr("type") == "password") {
						$(field).hide();
						$("#"+ffield).show();
					}
					else {
						$(field).val($(field).attr("holder"));
						$(field).addClass("holder");
					}
				}
			});
			
			$(field).bind("change",function() {
				$(field).removeClass("holder");
			});
		s
			$(field).parents(".envoyer").click(function() {
			  $(this).find(".holder").each(function() {
				if ($(this).val() == $(this).attr("holder")) { $(this).val(""); }
			  });
			});
		}
		});
		setTimeout("__jquery_placeholder_goTitling()",100);
	}
	
	
	function __jquery_placeholder_goTitling() {
		$("input[type=text],textarea").each(function(){
			if (($(this).attr("holder") != "") && ($.trim($(this).val()) == "")) {
				$(this).val($(this).attr("holder"));
				$(this).addClass("holder");
			}
		});
	}
	

