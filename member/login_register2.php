<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Hi24 嗨購網</title>

    <!-- Bootstrap Core CSS -->
    <link href="../css/bootstrap.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../css/modern-business.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

</head>

<body>
 <!-- 選單列 -->
 <div class="navbar-frame navbar-fixed-top">
 <div class="container">
  <a class="navbar-brand" href="../index.html"><img src="../images/in_img/logo.png"></a>
 <div class="navbar-top navbar-right">
        <div class="right">　<a href="../shopping/shopping_cart.html" style=""><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 0 個商品</a></div>
        <div class="right"><a href="../member/login_register.html">登入 │ 註冊</a></div>
	 </div>
</div>
<nav class="navbar navbar-default">
  <div class="container"> 
    <!-- 切換導航 for手機版 -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation 切換導航</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
      </div>
    
    <!-- 主選單列 -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="../index.html">HOME <span class="sr-only">(current)</span></a> </li>
         <li class="dropdown">
                        <a href="product.htm" class="dropdown-toggle" data-toggle="dropdown">WOMEN <b class="caret"></b></a>
                         <ul class="dropdown-menu">
                            <li>
                                <a href="../product/product_paging.html">上衣類</a>
                            </li>
                            <li>
                                <a href="#">襯衫類</a>
                            </li>
                            <li>
                                <a href="#">外套類</a>
                            </li>
                            <li>
                                <a href="#">針織衫</a>
                            </li>
                            <li>
                                <a href="#">褲&裙裝</a>
                            </li>
                            <li>
                                <a href="#">家居&內著</a>
                            </li>
                             <li>
                                <a href="#">配件</a>
                            </li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">MEN <b class="caret"></b></a>
                         <ul class="dropdown-menu">
                            <li>
                                <a href="product_paging.html">上衣類</a>
                            </li>
                            <li>
                                <a href="#">襯衫類</a>
                            </li>
                            <li>
                                <a href="#">外套類</a>
                            </li>
                            <li>
                                <a href="#">針織衫</a>
                            </li>
                            <li>
                                <a href="#">褲&裙裝</a>
                            </li>
                            <li>
                                <a href="#">家居&內著</a>
                            </li>
                             <li>
                                <a href="#">配件</a>
                            </li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">KIDS <b class="caret"></b></a>
                         <ul class="dropdown-menu">
                            <li>
                                <a href="product/product_paging.html">上衣類</a>
                            </li>
                            <li>
                                <a href="#">襯衫類</a>
                            </li>
                            <li>
                                <a href="#">外套類</a>
                            </li>
                            <li>
                                <a href="#">針織衫</a>
                            </li>
                            <li>
                                <a href="#">褲&裙裝</a>
                            </li>
                            <li>
                                <a href="#">家居&內著</a>
                            </li>
                             <li>
                                <a href="#">配件</a>
                            </li>
                        </ul>
                    </li>
                    
                    <li class=""><a href="product_sale.html">SALE</a> </li>
               </ul>
                <form class="navbar-form navbar-right" role="search">
                <div class="input-group">
                     <input type="text" class="form-control">
                     <span class="input-group-btn">
                     <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
                     </span>
                    </div>
      </form>
    </div>
    <!-- /.navbar-collapse --> 
  </div>
  <!-- /.container-fluid --> 
</nav>
</div>
	
<!-- Header Carousel -->
    <header class="page-title-pic">
     <div class="container"><div class="col-md-12 col-sm-6">
    <h2 class="page-title">會員登入 ‧ 註冊</h2>
    </div>
    </div>
    
    </header>

    <!-- Page Content 中間區塊-->
    <div class="container">
    <!-- Page/Breadcrumbs 麵包屑 (路徑)-->
        <div class="row">
            <div class="col-lg-12">             
                <ol class="breadcrumb">
                    <li><a href="../index.html">Home</a>
                    </li>
                    <li>會員登入註冊</li>               
              </ol>
            </div>
        </div>
        <!-- /.row -->
        
        <!-- 登入‧註冊Tabs -->
        <div class="row">

        <div class="login-tab">
           <ul id="myTab" class="nav nav-tabs2 nav-justified">
                    <li class=""><a href="#service-one" data-toggle="tab">會員登入</a>
                    </li>
                    <li class="active"><a href="#service-two" data-toggle="tab">會員註冊</a>
                    </li>
                  
          </ul>
          
          <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade in login-tab-pane" id="service-one">	
            <!-- 會員登入 -->
            <form>
            <div class="login_register">
              <p>
               <label for="login_pw" class="login_pw">輸入您的e-mail/手機號碼</label>
                <input type="text" value="" size="32">
              </p>
              <p>
                <label for="login_pw" class="login_pw">請輸入密碼（6-20英數字）</label>
                <input type="password" name="password" id="password" value="" size="32">
              </p>
              <p>
                <input type="button" name="button" id="button" value="登入" class="button">
              </p>
              <p class="link"><span class="link left"><input type="checkbox">
              記住我</span> <a href="forgetpw.html"><span class="link right">忘記密碼？</span></a></p>
            </div>
             </form> 
            </div>
            <div class="tab-pane fade  active in login-tab-pane" id="service-two">
            <!-- 會員註冊 -->            
            <form>
            <div class="login_register">
            
            <h3 align="center">已發送簡訊驗證碼到您的手機</h3>
            <p>請輸入簡訊內4位數驗證碼</p>
            <p align="center"><img src="../images/member/register02.jpg" width="267" height="46" alt=""/></p>
            <p></p>
              <p>
               <label for="login_pw" class="login_pw">輸入您的e-mail/手機號碼</label>
                <input type="text" value="" size="32">
              </p>
              
              <p>
                <a href="login_register3.html"><input type="button" name="button" id="button" value="登入" class="button"></a>
              </p>
              <p>收到簡訊驗證碼後，請依照步驟完成驗證註冊</p>
             
             </form> 
            </div>      
      
           
        </div>
            
        </div><!-- /.登入‧註冊Tabs_row -->
        
</div>      

      
</div>
<!-- /.中間區塊container -->

<!-- 回到最上TOP方 -->
<div id="scroll-top" style="display: block;"><a href="#"><i class="fa fa-angle-up"></i></a></div>
    
<!-- Footer -->
<div class="footer_bg">
    <footer class="footer_bg">
         <div class="container">
            <div class="row">                             
                <div class="col-lg-12">
					<div class="logo left"><a class="" href="../index.html"><img src="../images/in_img/logo_footer.png" width="195" height="81" alt=""/></a></div>
                    
                  <ul class="list-inline left">
                        <li>
                            <a href="../index.html">回頁頁</a>
                      </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="../others/news.htm">最新訊息</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="../others/contact.html">聯絡我們</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="../member/login_register.htm">會員專區</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                    <li>
                            <a href="../qa/member.htm">購物說明</a>
                    </li>
                  </ul>
                    
                    <ul class="list-inline right">
                        <li>
                            <a href="../page/terms.html">網站使用條款</a>
                        </li>
                        <li class="footer-menu-divider">│</li>
                        <li>
                            <a href="../page/policy.html">隱私權政策</a>
                        </li>
                        <li class="footer-menu-divider">│</li>
                        <li>
                            <a href="../page/disclaimer.html">免責聲明</a>
                        </li>                        
                    </ul>
                    
                   
                    <div class="clear"></div>
                    <p class="copyright right">Copyright &copy; Hi24 嗨購網 2018</p>
                </div>
            </div>
		</div>
    </footer>
</div>
 
<!-- jQuery -->
    <script src="../js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../js/bootstrap.min.js"></script>

    <!-- Script to Activate the Carousel -->
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>

</body>

</html>
