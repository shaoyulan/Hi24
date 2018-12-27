jQuery(document).ready(function($) {
//default set up
	
	//建立模板產生、放置器 fill template function
	var place_data = function($structure,$target,$data){
		var html_structure = $($structure).html();
		var compiled_template = Handlebars.compile(html_structure);
		var UI = '';
		$.each($data,function(index,data){
			UI = UI + compiled_template(data);
		});
		$($target).html(UI);
		UI = '';
	};

	// 建立可塞選的模板產生器，用於點擊不同分類時 篩選基準category_main、sub
	var Call_AJAX_place_data = function($info_to_send,$where_to_place,$structure,$func){
		console.log('Call_AJAX_place_data');
		//判斷裡面是否為空，為空則抓取資料
		if ($($where_to_place).find('.col-md-3').length == 0){
			$.ajax({
				type:'POST', //必填
				url:'../crud/dataFiltered.php',
				dataType:'json',
				data:$info_to_send,
				success:function(data){
					place_data($structure,$where_to_place,data);
				},
				complete:function(){
					if($func){
						$func();
					}
				}

			});
		}
	}

	// 載入各頁面 Load specified page on click 
	// $after_load : load 後要執行的程式
	var Page_loader = function(e,$page_to_load,$after_load){
		// shut previous load thead
		window.stop();
		console.log('pageloader');
		
		// 網站頁面載入，使用者是否存在
		if(sessionStorage.getItem('username')){
			username = sessionStorage.getItem('username');
			$('.right .login').html("<span style='color:red'>"+username+"您好!</span>");
		}

		// to avoid footer to show up awkwardly.
		$('.footer_bg').css('display','none');
		// hide page we don't want to use 
		$('.wraper>div').css('display','none');
		// :not selector should NOT use quote mark
		$('.wraper>div:not(.index,#scroll-top)').fadeOut(100).load($page_to_load,$after_load).fadeIn(1000);

		$('.footer_bg').delay(1000).fadeIn(500);

		// history.pushState('',$page_to_load,$page_to_load);
	}

	// window.onpopstate = function(e){
	// 	var path = location.pathname;

	// }

	// 次分類中譯
	var Category_translate = function($EngName){
		// var subCat='';
		switch($EngName){
			case 'upper':
				Cat = '上衣類';
				break; 
			case 'shirt':
				Cat ='襯衫類'
				break;
			case 'coat':
				Cat ='外套類'
				break;
			case 'sweater':
				Cat ='針織衫'
				break;
			case 'pants':
				Cat ='褲&裙裝'
				break;
			case 'home&inside':
				Cat ='家居&內著'
				break;
			case 'accessories':
				Cat ='配件'
				break;
		}
		return Cat;
	}

	//依Color Size抓取ID
	// AJAX doesn't return value, so $func is optional for use
	var get_item_id = function($title,$size,$func){
		$.ajax({
			type:'POST', //必填
			url:'../crud/dataFiltered.php',
			dataType:'json',
			data:{title:$title,size:$size,mode:'product_item_detail_id'},
			success:function(data){
				id = data[0]["item_id"];
				// optional
				if(!$func==""){
					$func(id);
				}
			},
		});

	}

	function change_id(id){
		$('#isn').text(id);
	}

	function index_setup(){
		console.log('index_setup');
		// 新增history
		history.pushState('','index','index.php');
		// 放置Bbanner廣告 place Banner carousel
		place_data('#header-slider-template','.carousel-inner',headerAds);
		// 放置不分類商品place Content products -- Category ALL
		place_data('#product-list-template-model','#service-one .row',products);
		// 點擊分類後顯示商品分頁 place content products -- Category Women
		$('body a[href="#service-two"]').on('click',Call_AJAX_place_data({category_main:"women"},'#service-two .row','#product-list-template-model'));
		$('body a[href="#service-three"]').on('click',Call_AJAX_place_data({category_main:"men"},'#service-three .row','#product-list-template-model'));
		$('body a[href="#service-four"]').on('click',Call_AJAX_place_data({category_main:"kid"},'#service-four .row','#product-list-template-model'));
	}

	//預先定義  載入Prodcut_detail 後 稍後要執行的fuction
	function prodcut_detail_func($vars){
		
		// 將第一張設為active
		$('.product_detail .p_color').find('a:eq(0) img').addClass('active');
		
		// 載入右邊區塊
		  // 將title	改為第一件的
		  var title = $('.product_detail .p_color').find('a:eq(0)').data('title');
		  $('#icolor').text(title);


		  // 設定衣服Size avalible status (現有庫存)
		  $.post('../crud/dataFiltered.php', {title:title,mode:"product_item_detail_size"}, function(data, textStatus, xhr) {
		  		 // 訂定Size狀態
		  		 $.each(data,function(key,value){
		  		 	size = value["size"];
		  		 	// :contains only accept text
		  		 	$(".product_detail .p_size:contains('"+size+"')").addClass('avalible');
		  		 });
		  		 // 設定第一個為預設
		  		 $(".product_detail .p_size:eq(0)").addClass('active');
		  });
		  
     	   // 將商品編號改為第一件的
		   var size = $('.p_size:eq(0)').text();
		   var id = get_item_id(title,size,change_id)
		  // 依第一件item id 修改size 區塊 
	} 

	
	// 網站初始載入，使用者是否存在
	if(sessionStorage.getItem('username')){
		username = sessionStorage.getItem('username');
		$('.right .login').html("<span style='color:red'>"+username+"您好!</span>");
	}

	// 各頁點擊載入--Women 圖示那張-- -- WOMEN -- All
	$('body').on('click','a[href="product/product.html"]',function(e){
		e.preventDefault();
		Page_loader(e,"product/product.php",function(e){
			// Do after_load
			Call_AJAX_place_data({category_main:"women"},'.product .row:eq(1)','#product-list-template-model');
		});
	});

	// 各頁點擊載入--Women下方分頁區塊-- -- WOMEN -- Upper
	$('a[href="product/product_paging.php"]').on('click',function(e){
		var url = this.href; 
		console.log(
		); //url = http://localhost:8888/product/product_paging.php
		Page_loader(e,url,function(e){
			// Do after_load
			Call_AJAX_place_data({category_main:"women",category_sub:"upper",mode:"2"},'.product_paging .service-two','#product-list-template');
		});
	});

	

	// 商品詳細頁點擊載入 - -- ALL
	$('.row').on('click','a[href="product/Product_detail.html"]',function(e){
		e.preventDefault();
		e.stopPropagation();
		// Breadcrumb bar
		var title = $(this).parent().data('title');
		var mainCat = $(this).parent().data('maincat');
		var subCat = $(this).parent().data('subcat');
		var subCat = Category_translate(subCat);
		var price_org = $(this).next().find('.p_price:eq(0)').text();
		var price_dis = $(this).next().find('.p_prices').text();
		id = $(this).parent().data('id');
		Page_loader(e,"product/Product_detail.php",function(e){

			// Do after_load
			// Chane Breadcrumbs 
			//**************IMPORTANT : Propagation !!******************
			$('.breadcrumb').find('li:eq(1)').text(mainCat); 
			$('.breadcrumb').find('li:eq(2)').text(subCat);
			$('.breadcrumb').find('li:eq(3)').text(title);
			$('.product_detail .p_price_midline').text(price_org);
			$('.product_detail .p_price_money').text(price_dis);

			Call_AJAX_place_data({id:id,mode:'product_detail'},'.photo_places','#product_default_photos');

			// 載入替換的四張照片、設定對應色塊
			Call_AJAX_place_data({id:id,mode:'product_item_detail'},'.product_detail .p_color','#product_main_photos',prodcut_detail_func);
			
		});
	});

	// 商品詳細頁各項功能
	 //顏色區塊hover時
	   //更換照片
	   //更換title
	   //更換item id
	 // 點擊後
	    //點擊color box 更換ID
	    $('body').on('click','.product_detail .p_color img',function(e){
	    	// 更換active 狀態
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$(this).closest('.p_color').find('img').removeClass('active');
	    	$(this).addClass('active');
	    	// 設定目前id
	    	var title = $('.p_color .active').closest('a').data('title');
	    	var size = $('.p_size.active').text();
	    	$('#icolor').text(title);
	    	var id = get_item_id(title,size,change_id);
	    	// to send a function name(e.g change_id), you should not make it quoted like "XXX"	
	    });

	    //點擊Size box 更換ID
	    $('body').on('click','.product_detail .p_size',function(e){
	    	// 更換active 狀態
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$('.p_size.active').removeClass('active');
	    	$(this).addClass('active');
	    	// 設定目前id
	    	var title = $('.p_color .active').closest('a').data('title');
	    	var size = $('.p_size.active').text();
	    	$('#isize').text('-'+size);
	    	var id = get_item_id(title,size,change_id);
	    	// to send a function name(e.g change_id), you should not make it quoted like "XXX"	
	    });

	// 首頁資料載入
	index_setup();

	$('body').on('click','a[href="index.php"]',function(e){
		Page_loader(e,"../index_content.php",function(e){
			index_setup();
		});
	});

	// Cart number counter
	$('.wraper').on('click','.btn-primary',function(e){
		e.preventDefault();
		// fetch current number
		var number = $('.navbar-right').find('.glyphicon').text();
		// selected-item price
		if($('.p_price_money').text()){
			var price = parseInt($('.p_price_money').text());
		}else{
			var price = parseInt($(this).parent().prev().prev().find('.p_prices').text());
		}

		// show-up info 
		if($(this).hasClass('buy')){
			console.log('hasbuy');
			$('.show-up-info').text('商品已取消')
			// renew total number
			$('.navbar-right').find('.glyphicon').text(--number);
			// cancel order so price = -price
			price = price - (price*2);
		}else{
			$('.show-up-info').text('商品已購買')
			// renew total number
			$('.navbar-right').find('.glyphicon').text(++number);
			// buy so price = price
		}

		// set btn to red bgc
		$(this).stop().toggleClass('buy');

		$('.show-up-info').stop().fadeIn(1200,function(e){
			$(this).fadeOut(1200);
		});

		// renew total price
		var total_price = parseInt($('.total-price').text());
		$('.total-price').text(price+total_price+'元');


	});

	// login form -- show/hide form
	$('.login').click(function(e){
		e.preventDefault();
		// $(this).closest('.navbar-right').find('.login-form').stop().slideToggle(400);
		Page_loader(e,"../member/login_register.php");
	});

	// 選單收合
	$('body').click(function(e){
		var container = $('.right');
		var login = $('.right:eq(1)');
		var cart = $('.right:eq(0)');
		//outside target
		if (e.target != container && container.has(e.target).length===0 ){
			container.find('.js-toggle').slideUp();
		}
		//slidup not clicked target
		// if (login.has(e.target).length===0){
		// 	login.find('.js-toggle').slideUp();
		// }else{
		// 	cart.find('.js-toggle').slideUp();
		// }
	});

	// Hide Menu When lost focus
	// $('.right .login-form').focusout(function(e){$('.js-toggle').stop().slideUp(400)});

	// login verify
	$('body').on('click','#button',function(e){
		username = $('.login_register:eq(0) p:eq(1)').find('input').val().trim();
		var password = $('.login_register:eq(0) p:eq(2)').find('input').val().trim();
		console.log('ps'+password+'us'+username);
		$.ajax({
			type:'POST', //必填
			url:'../crud/meberVerify.php',
			dataType:'json',
			data:{username: username,password:password},
			success:function(data, textStatus, xhr){

				if (data.verify == '錯誤的帳號或密碼'){
					$('#login').html('<span style="color:red">'+data.verify+'!</span>');
				}else{
					// 設定內存username
					sessionStorage.setItem('username',username);
					
					//提示登入成功、導回首頁
					$('#login').html('<span style="color:red">親愛的'+data.verify+'您好!</span>')
					.delay(500).animate({opacity:'0'},400,function(e){
						$('#login span').text('將帶您回到首頁').parent().animate({opacity:'1'},400);
					});
					setTimeout(function(){window.location.href='index.php';},2000);
					// The following method won't work
					// setTimeout(function(){$('.nav a[href="index.php"]').click();},2000);
				}
			},
			error:function(data, textStatus, xhr){
				console.log('smsAPI呼叫失敗'+xhr)
			},
		});

	});

	// Member register 
	$('body').on('click','#button2',function(e){
		e.preventDefault();
		// e.stopPropagation();
		phone_number = $(this).parent().prev().find('input').val();
		Page_loader(e,"../member/login_register2.php");
		
		// 產生亂數
		var verify_num="";
		for (var i = 1; i <= 4; i++) {
			verify_num += String(Math.floor((Math.random()*10)));
		}
		console.log('驗證碼'+verify_num);
		// 呼叫SMS API
		$.ajax({
			type:'POST', //必填
			url:'../SMS API/sms_api2.php',
			dataType:'json',
			data:{phone_number:phone_number,verify_num:verify_num},
			success:function(data, textStatus, xhr){
				$('.login_register h3:eq(0)').text('簡訊API呼叫成功：餘額'+data.balance+'元')
				// console.log();
			},
			error:function(data, textStatus, xhr){
				console.log('smsAPI呼叫失敗'+xhr)
			},
		});

		//使用者點擊送出簡訊驗證碼
		$('body').on('click','#button3',function(e){
			//取得使用者輸入
			e.stopPropagation();
			console.log($(this).parent().prev().find('input').val());
			var user_input = $(this).parent().prev().find('input').val();
			if(user_input == verify_num){
				Page_loader(e,"../member/login_register3.php");
				//使用者註冊密碼
				$('body').on('click','#button4',function(e){
					e.stopPropagation();
					var user_RegPwd = $(this).parent().prev().find('input').val();
					console.log('PWD'+user_RegPwd);
					$.ajax({
						type:'POST', //必填
						url:'../crud/meberRegister.php',
						dataType:'json',
						data:{name:phone_number,password:user_RegPwd},
						success:function(data, textStatus, xhr){
							console.log('data'+data);
							alert('註冊成功');
							// 設定內存username
							sessionStorage.setItem('username',phone_number);
							// 導向回首頁
							setTimeout(function(){window.location.href='index.php';},2000);

						},
						error:function(data, textStatus, xhr){
							console.log('失敗'+xhr)
						},
					});

					// $.post('../crud/meberRegister.php', {name:phone_number,password:user_RegPwd}, function(data, textStatus, xhr) {
					// 	console.log('data'+data);
					// 	alert('註冊成功');
					// });
				});
			}
		});

		

		// $('body').on('click','#button3',function(e){
		// 	console.log($(this).closest('input').val();
		// });
		//偵測使用者輸入
			// 驗證成功

			// 驗證失敗
		
	});




	// Shopping cart show/hide
	$('.navbar-right').find('.right').first().click(function(e){
		e.preventDefault();
		// after close login fomr, show/hide login form
		var total = $('.navbar-right').find('.glyphicon').text();
		var text = '目前有'+total+'樣商品，共';
		$(this).closest('.navbar-right').find('.item-num').text(text).stop().parent().slideToggle(400);
	});


// InterFace UI/UX
	// Scroll-top icon
	$('#scroll-top').click(function(e){
		console.log('test');
		$('body').animate({'scrollTop':0},600);
	})
//paging


});