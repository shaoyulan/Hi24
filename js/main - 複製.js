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
			// $.post('../crud/data_filtered.php', $info_to_send, function(data, textStatus, xhr) {
			// 		place_data($structure,$where_to_place,data);
			// 		if($func){
			// 			$func();
			// 		}
			// });
		}
	}

	// 載入個頁面 Load specified page on click 
	// $after_load : load 後要執行的程式
	var Page_loader = function(e,$page_to_load,$after_load){
		e.preventDefault();
		$('.wraper>div').css('display','none');
		$('.wraper>div:not(".index")').css('display','block').load($page_to_load,$after_load);
	}

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
				console.log(id);
				if(!$func==""){
					$func(id);
					console.log(id);
				}
			},
		});

	}

	function change_id(id){
		$('#isn').text(id);
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

	// 各頁點擊載入--Women 圖示那張-- -- WOMEN -- All
	$('a[href="product/product.html"]').on('click',function(e){
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
			console.log(price_dis+'dis');

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
	    	$('.p_size.active').removeClass('active');
	    	$(this).addClass('active');
	    	// 設定目前id
	    	var title = $('.p_color .active').closest('a').data('title');
	    	var size = $('.p_size.active').text();
	    	$('#isize').text('-'+size);
	    	var id = get_item_id(title,size,change_id);
	    	// to send a function name(e.g change_id), you should not make it quoted like "XXX"	
	    });


	// 放置Bbanner廣告 place Banner carousel
	place_data('#header-slider-template','.carousel-inner',headerAds);
	// 放置不分類商品place Content products -- Category ALL
	place_data('#product-list-template-model','#service-one .row',products);
	// 點擊分類後顯示商品分頁 place content products -- Category Women
	$('a[href="#service-two"]').on('click',Call_AJAX_place_data({category_main:"women"},'#service-two .row','#product-list-template-model'));
	$('a[href="#service-three"]').on('click',Call_AJAX_place_data({category_main:"men"},'#service-three .row','#product-list-template-model'));
	$('a[href="#service-four"]').on('click',Call_AJAX_place_data({category_main:"kid"},'#service-four .row','#product-list-template-model'));


	// Cart number counter
	$('.wraper').on('click','.btn-primary',function(e){
		e.preventDefault();
		// set btn to red bgc
		$(this).stop().toggleClass('buy');
		
		// show-up info 
		if($(this).hasClass('buy')){
			console.log('hasbuy');
		}
		$('.show-up-info').stop().fadeIn(1200,function(e){
			$(this).fadeOut(1200);
		});
		// $('.show-up-info').stop().toggleClass('show');
		// setTimeout(function(e){
		// 	$('.show-up-info').stop().toggleClass('hide');
		// },2000);
		// setTimeout(function(e){
		// 	$('.show-up-info').stop().removeClass('show').removeClass('hide');
		// },7000);

		// selected-item price
		var price = $(this).parent().prev().prev().find('.p_prices').text();
		// fetch current number
		var number = $('.navbar-right').find('.glyphicon').text();
		// renew total number
		$('.navbar-right').find('.glyphicon').text(++number);
	});

	// login form -- show form
	$('.login').click(function(e){
		e.preventDefault();
		// close shopping cart if exists
		// see if shopping cart is on display
		var shopping_cart_stat = $(this).closest('.navbar-right').find('.cart-total').css('display');
		if(shopping_cart_stat == 'block'){
			$(this).closest('.navbar-right').find('.cart-total').stop().slideToggle(400);
		}
		// after close shopping cart, show/hide login form
		$(this).closest('.navbar-right').find('.login-form').stop().slideToggle(400);
	});

	// login verify
	$('.login-form').find('.submit').click(function(e){
		var username = $('.username').text().trim();
		var password = $('.password').text().trim();
		$.post('../crud/meberVerify.php', {username: username,password:password}, function(data, textStatus, xhr) {
			// var ans = jQuery.parseJSON(data);  ps. If the returned data is plain text, use this to transfer it to jason objet
			if (data.verify == '錯誤的帳號或密碼'){
				$('.login').html('<span style="color:red">'+data.verify+'!</span>');
			}else{
				// 登入成功後收起選單
				$('.login-form').slideToggle(400);
				$('.login').text('親愛的'+data.verify+'您好!');
				
			}
		});
	});

	// show shopping detail
	$('.navbar-right').find('.right').first().click(function(e){
		e.preventDefault();
		// see if login form is on display
		var login_from_stat = $(this).closest('.navbar-right').find('.login-form').css('display');
		if(login_from_stat == 'block'){
			$(this).closest('.navbar-right').find('.login-form').stop().slideToggle(400);
		}

		// after close login fomr, show/hide login form
		var total = $('.navbar-right').find('.glyphicon').text();
		var text = '目前有'+total+'樣商品，共';
		$(this).closest('.navbar-right').find('.cart-total').text(text).stop().slideToggle(400);
	});


// InterFace UI/UX
	$('#scroll-top').click(function(e){
		console.log('test');
		$('body').animate({'scrollTop':0},600);
	})
//paging


});