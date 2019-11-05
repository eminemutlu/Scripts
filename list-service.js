	
	

	function service_status_all()
     {
     	var service_status = document.getElementById('service_status');
        service_status.value = 1;
     }
     

	function inputs_values_clear()
	{

		$("#keyword").val('');
		$("#serial_no").val('');
		$("#service_no1").val('');

		$("#start_date").val('');
		$("#finish_date").val('');

		
		$("#service_substatus_id option").attr("selected", false);
		$("#priority option").attr("selected", false);


		$("#sales_zone_id option").attr("selected", false);
		$("#process_stage option").attr("selected", false);

		$("#sale_add_option option").attr("selected", false);
		$("#servicecat_id option").attr("selected", false);
	}


	function form_submit()
	{
		var test = document.getElementById("list_service");
        PROCTest(test,0);
	}

	
	function GenelToplamlar(sale_option_id,select_name)
	{
		inputs_values_clear();

		selectitems(sale_option_id,'sale_add_option');

		service_status_all();
		
		form_submit();

	}

	function GenelToplanlar_Kirilim(sale_option_id,servicecat_idd)
	{
		
		inputs_values_clear();

		selectitems(sale_option_id,'sale_add_option');

		selectitems(servicecat_idd,'servicecat_id');

		service_status_all();
		
		form_submit();

	}


    function altParametrelerSent(service_add_option_id,sz_id,process_stage)
    {

        inputs_values_clear();
		
        var sale_add_option = "";
        var sales_zone_id = "";
        var str="";
        var res="";

        var toplam_deger_sale_add_options="";


        if(service_add_option_id == 0 && sz_id == 0)
        {
 			toplam_deger_sale_add_options='1,2,4';
        	selectitems(toplam_deger_sale_add_options,'sale_add_option');

        }else if(service_add_option_id == 0 && sz_id !== 0){
        	toplam_deger_sale_add_options='1,2,4';
        	selectitems(toplam_deger_sale_add_options,'sale_add_option')
        	sales_zone_id = document.getElementById('sales_zone_id');
	        sales_zone_id.value = sz_id;
	    } else if(service_add_option_id !== 0 && sz_id == 0){
	    	sale_add_option = document.getElementById('sale_add_option');
	    	sale_add_option.value = service_add_option_id;
	    	sales_zone_id = document.getElementById('sales_zone_id');
	    	 sales_zone_id.value = "";
        } else {
        	sale_add_option = document.getElementById('sale_add_option');
	        sale_add_option.value = service_add_option_id;
	        sales_zone_id = document.getElementById('sales_zone_id');
	        sales_zone_id.value = sz_id;
        }

        service_status_all();
	        
		selectitems(process_stage,'process_stage');	
        
        form_submit();
        
    }


     function callcenter(sz_id,process_stage)
     {
     	inputs_values_clear();

		sales_zone_id = document.getElementById('sales_zone_id');
		sales_zone_id.value = sz_id;

		selectitems(process_stage,'process_stage');	

		service_status_all();

		form_submit();
     }

     

	function selectitems(str,selectId) {

		var select = document.getElementById(selectId);
		var array = str.split(",");
		
		for(i=0; i<select.options.length; i++) 
		{
			select.options[i].selected=false;
		}

		for(count=0; count<array.length; count++) 
		{
			for(i=0; i<select.options.length; i++) 
			{
			  if(select.options[i].value == array[count])
			  {
			    select.options[i].selected="selected";
			  }
			}
		}

	}


	function myFunctionmobileMenu() 
	{

	    if ( $('.menus .nav').hasClass('active') ){""
	    	$('.menus .nav').removeClass('active');
	    } else {
	    	 $(".menus .nav").addClass("active");
	    }
	    
	}

	function myFunctionmobileMenu_alt() 
	{
		
		$('.menus2 #wrk_module_menu_inner_table td').each(function () {
			$(this).replaceWith(function () {
				return $('<li class="">' + this.innerHTML + '</li>')
			})
		});
		$('.menus2 #wrk_module_menu_inner_table li:first-child').each(function () {
			$(this).replaceWith(function () {
				return $('<div>' + this.innerHTML + '</div>')
			})
		});

	    if ( $('table#wrk_module_menu_inner_table li').hasClass('active') ){
	    	$('table#wrk_module_menu_inner_table li').removeClass('active');
	    } else {
	    	 $("table#wrk_module_menu_inner_table li").addClass("active");
	    }
	    
	}


	function Method1(){
	    $.get(
	        "//www.com", 
	        {
	            method: 1
	        },
	        OnMethod1
	        );
	}

	function OnMethod1( strReturn ){
        $( "#output_statical" ).html( strReturn );
    }

    $( document ).ready(function() {

		 Method1();

	});


	
	function LoadValue(value1,value2)
	{

		$.ajax({
			url: "www.com" , 
			dataType: 'json',
			type: "get",
			data: {
				sale_option_id : value1,
				category_ids : value2
			},

			success: function(result)
			{
				var firstPart0 = result;
				var firstPart0_ = firstPart0.split('%');

				$( "#genelcount" ).html(firstPart0_[0]);
				
				var firstPart1_ = {};
				var values1 = {};
				var firstPart1 = firstPart0_[1].substring(0, firstPart0_[1].length - 1);
				firstPart1_ = firstPart1.split(',');

				for (var x = 0; x < firstPart1_.length; x++) {
					
					values1 = firstPart1_[x].split('/');

						$( "#fe_"+values1[0] ).html(values1[1]);
						
				}
	
				var firstPart2_ = {};
				var values2 = {};
				var firstPart2 = firstPart0_[2];
				firstPart2_ = firstPart2.split(',');

				for (var x = 0; x < firstPart2_.length; x++) {
					
					values2 = firstPart2_[x].split('/');

						$( "#accordion_alt_"+values2[0]+" #collapseOne_"+values2[0]+" li#sub_"+values2[1]+" span.count_value" ).html("("+values2[2]+")");
							
				}

				var firstPart3_ = {};
				var values3 = {};
				var firstPart3 = firstPart0_[3].substring(0, firstPart0_[3].length - 1);
				firstPart3_ = firstPart3.split(',');

				for (var x = 0; x < firstPart3_.length; x++) {
					
					values3 = firstPart3_[x].split('/');

						$( "#accordion_alt_"+values3[0]+" #collapseOne_"+values3[0]+" li.sub_0>span.count_other" ).html("("+values3[1]+")");				
							
				}

				var firstPart4_ = {};
				var values4= {};
				var firstPart4 = firstPart0_[4];
				firstPart4_ = firstPart4.split(',');
				var s=0;
				for (var x = 0; x < firstPart4_.length; x++) {
					s=x+1;	
					values4 = firstPart4_[x].split('=');

					$( "#accordion_"+s+" #panel"+s+" #oprs_"+s+" #caption_"+s ).html(values4[0]+" ("+values4[1]+")");	
							
				}

				var firstPart5 = firstPart0_[5];
				firstPart5 = firstPart5.substring(0, firstPart5.length - 3);
				var firstPart5_ = {};
				var values5_plus= {};
				var operasyon_accordion_id="";
				var firstPart5_ = firstPart5.split('$');
				for (var x = 0; x < firstPart5_.length; x++) 
				{
					
					values5_plus = firstPart5_[x].split('+');
					operasyon_accordion_id = values5_plus[0]; 
	
					LoadValue_accordion_continuation_zones(operasyon_accordion_id,values5_plus[1]);
					
				}


				var today = new Date();
				var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

				$( "#guncelleme_tarihi").html("Verilerin Güncel Tarihi<br>"+date+" "+time);


			}

		});
	}


	function LoadValue_accordion_continuation_zones(accordion_id,value)
	{
		
		var value_get = "";
		var degisken_dizi = {};
		var b_part_1 = {};
		var degisken_dizi1 = {};
		var degisken_dizi2 = {};
		var p="";

		var degisken="";

		if(accordion_id == 7)
		{
			value_get = value;
		} else {
			value_get = value.substring(0, value.length - 1);
		}

		degisken_dizi = value_get.split('@');
		count = (degisken_dizi.length);

		for (var x = 0; x < degisken_dizi.length; x++) 
		{
			if(accordion_id == 7 && count == (x+1))
			{
				degisken =  degisken_dizi[x];
			} else {
				degisken = degisken_dizi[x].substring(0, degisken_dizi[x].length - 1);
			}	
		
			b_part_1 = degisken.split('=');

			p=b_part_1[0];

			degisken_dizi1 = b_part_1[1].split(',');

			for (var z = 0; z<degisken_dizi1.length; z++) 
			{

				degisken_dizi2 =  degisken_dizi1[z].split('/');	

				for (var y = 0; y < degisken_dizi2.length; y++) 
				{	

					$("#accordion_"+accordion_id+" #accordion_a"+accordion_id+" #panell_"+accordion_id+"_"+p+" li#m_"+accordion_id+"_"+p+"_"+degisken_dizi2[0]+">span:nth-child(2)").html("("+degisken_dizi2[1]+")");
				}
				
			}	
		}

	}

setInterval(function () {
   		LoadValue(0,0);
	}, 100000);

