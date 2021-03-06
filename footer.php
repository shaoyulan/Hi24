 
<!-- Footer -->
<div class="footer_bg test-original">
    <footer>
         <div class="container">
            <div class="row">                             
                <div class="col-lg-12">
                    <div class="logo left"><a class="" href="index.html"><img src="images/in_img/logo_footer.png" width="195" height="81" alt=""/></a></div>
                    
                  <ul class="list-inline left">
                        <li>
                            <a href="#">回頁頁</a>
                      </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="others/news.htm">最新訊息</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="others/contact.html">聯絡我們</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="member/login_register.htm">會員專區</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                    <li>
                            <a href="qa/member.htm">購物說明</a>
                        </li>
                    </ul>
                    
                    <ul class="list-inline right">
                        <li>
                            <a href="page/terms.htm">網站使用條款</a>
                        </li>
                        <li class="footer-menu-divider">│</li>
                        <li>
                            <a href="page/policy.html">隱私權政策</a>
                        </li>
                        <li class="footer-menu-divider">│</li>
                        <li>
                            <a href="page/disclaimer.html">免責聲明</a>
                        </li>                        
                    </ul>
                    
                   
                    <div class="clear"></div>
                    <p class="copyright right">Copyright &copy; Hi24 嗨購網 2018</p>
                </div>
            </div>
        </div>
    </footer>
 </div>

 <!-- Header-slider Template -->
 <script id="header-slider-template" type="text/x-handlebars-template"> 
 <div class="{{ad_stat}}">
     <div class="fill" style="background-image: url({{img_url}});"></div>
     <div class="{{caption_stat}}">
         <h2>{{caption_text}}</h2>
     </div>
 </div>
 </script>

 <!-- Product list Template -->
 <script id="product-list-template" type="text/x-handlebars-template">
    <div class="col-md-3 col-sm-6 img-portfolio" data-maincat="{{category_main}}" data-subcat="{{category_sub}}" data-title="{{title}}" data-id="{{id}}">
        <div class="{{active_stat}}">{{activity_text}}</div>
            <a href="product/Product_detail.html">
                <img class="img-responsive img-hover" src="{{img_url_itemonly}}" alt="">
            </a>
        <div class="caption">
            <h3>{{title}}</h3>
            <p class="right">
                <span class="p_price">NT${{price_org}}</span>　
                <span>活動價 NT$</span><span class="p_prices">{{price_dis}}</span>
            </p>
        <div class="clear"></div>
            <p class=" text-center">
                <a href="#" class="btn btn-primary" role="button" >
                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Add to Cart
                </a>
            </p>
        </div>
    </div>
</script>

 <!-- Product list Template MODEL ONLY -->
 <script id="product-list-template-model" type="text/x-handlebars-template">
    <div class="col-md-3 col-sm-6 img-portfolio"  data-maincat="{{category_main}}" data-subcat="{{category_sub}}" data-title="{{title}}" data-id="{{id}}">
        <div class="{{active_stat}}">{{activity_text}}</div>
            <a href="product/Product_detail.html">
                <img class="img-responsive img-hover" src="{{img_url_withmodel}}" alt="">
            </a>
        <div class="caption">
            <h3>{{title}}</h3>
            <p class="right">
                <span class="p_price">NT${{price_org}}</span>　
                <span>活動價 NT$</span><span class="p_prices">{{price_dis}}</span>
            </p>
        <div class="clear"></div>
            <p class=" text-center">
                <a href="#" class="btn btn-primary" role="button">
                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Add to Cart
                </a>
            </p>
        </div>
    </div>
</script>

<!-- prodcut detail page -->
<script id="product_main_photos" type="text/x-handlebars-template">
    <a href="#" data-id="{{id}}"" data-title="{{title}}" data-size="{{size}}" data-item_id="{{item_id}}">
      <img src="{{color}}" alt="" onMouseOver="MM_swapImage('photo','','{{main_photo_substitute}}',1)" onMouseOut="MM_swapImgRestore()">
    </a>
</script>

<script id="product_default_photos" type="text/x-handlebars-template">
              <div class="col-md-8 img-portfolio right">
                  <p>
                     <img class="img-responsive" src="{{inner_photo1}}" width="760" height="910" alt=""/>
                  </p>
                  <p>
                     <img class="img-responsive" src="{{inner_photo2}}" width="760" height="910" alt=""/>
                  </p>
                  <p>
                      <img class="img-responsive" src="{{inner_photo3}}" width="760" height="910" alt=""/>
                  </p>
                  <p>
                    <img class="img-responsive" src="{{inner_photo4}}" width="760" height="910" alt=""/>
                  </p>
              </div>
           </script>
<!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Handlebars template -->
    <script src="js/handlebars-v4.0.12.js"></script>
    <!-- website main js -->
    <script src="js/main.js"></script>
    <!-- Script to Activate the Carousel 大廣告-->
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>

</body>

</html>
