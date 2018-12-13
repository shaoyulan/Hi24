<?php 
header('Content-Type: application/json;charset=utf8'); 
// DB object
try{
	$pdo = new PDO('mysql:host=localhost;dbname=hi24;port=8889;charset=utf8','root','root');
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}


// command SQL 
$sql ='SELECT * FROM `product_default_photos` WHERE `id`=1 ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
// $statement->bindValue(':id',$_POST['id']); 


$statement->execute();
$product_default_photos = $statement->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($product_default_photos,JSON_NUMERIC_CHECK);


