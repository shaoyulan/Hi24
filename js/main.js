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
	var Call_AJAX_place_data = function($info_to_send,$where_to_place,$structure){
		//判斷裡面是否為空，為空則抓取資料
		if ($($where_to_place).find('.col-md-3').length == 0){
			$.post('../crud/data_filtered.php', $info_to_send, function(data, textStatus, xhr) {
					place_data($structure,$where_to_place,data);
			});
		}
	}

	// 建立可塞選的模板產生器，用於點擊不同分類時 篩選基準category_main、sub
	var Call_AJAX_place_photo = function($info_to_send,$where_to_place,$structure){
			$.post('../crud/default_img.php', $info_to_send, function(data, textStatus, xhr) {
					place_data($structure,$where_to_place,data);
			});

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

	// 各頁點擊載入--Women 圖示那張-- -- WOMEN -- All
	$('a[href="product/product.html"]').on('click',function(e){
		Page_loader(e,"product/product.php",function(e){
			// Do after_load
			Call_AJAX_place_data({category_main:"women"},'.product .row:eq(1)','#product-list-template-model');
		});
	});

	// 各頁點擊載入--Women下方分頁區塊-- -- WOMEN -- Upper
	$('a[href="product/product_paging.html"]').on('click',function(e){
		Page_loader(e,"product/product_paging.php",function(e){
			// Do after_load
			Call_AJAX_place_data({category_main:"women",category_sub:"upper",mode:"2"},'.product_paging .service-two','#product-list-template');
		});
	});

	

	// 單項商品點擊載入 - -- ALL
	$('.row').on('click','a[href="product/Product_detail.html"]',function(e){

		e.stopPropagation();
		// Breadcrumb bar
		var title = $(this).parent().data('title');
		var mainCat = $(this).parent().data('maincat');
		var subCat = $(this).parent().data('subcat');
		var subCat = Category_translate(subCat);
		id = $(this).parent().data('id');

		Page_loader(e,"product/Product_detail.php",function(e){
			// Do after_load
			// Chane Breadcrumbs 
			//**************IMPORTANT : Propagation !!******************
			$('.breadcrumb').find('li:eq(1)').text(mainCat);
			$('.breadcrumb').find('li:eq(2)').text(subCat);
			$('.breadcrumb').find('li:eq(3)').text(title);
			 Call_AJAX_place_photo({id:id},'.test','#product_default_photos');
		});
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
		$('.show-up-info').stop().toggleClass('show');
		setTimeout(function(e){
			$('.show-up-info').stop().toggleClass('hide');
		},2000);
		setTimeout(function(e){
			$('.show-up-info').stop().removeClass('show').removeClass('hide');
		},7000);

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
		$.post('../crud/meber_verify.php', {username: username,password:password}, function(data, textStatus, xhr) {
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