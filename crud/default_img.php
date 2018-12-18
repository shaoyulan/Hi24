<?php 
header('Content-Type: application/json;charset=utf8'); 
include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}


// command SQL 
$sql ='SELECT * FROM `product_default_photos` WHERE `id`=:id ORDER BY `id` ASC';
$statement = $pdo->prepare($sql);
$statement->bindValue(':id',$_POST['id']); 


$statement->execute();
$product_default_photos = $statement->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($product_default_photos,JSON_NUMERIC_CHECK);


