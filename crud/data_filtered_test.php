<?php 
header('Content-Type: application/json;charset=utf8'); 
// DB object
try{
	$pdo = new PDO('mysql:host=localhost;dbname=hi24;port=8889;charset=utf8','root','root');
}catch(PDOException $e){
	echo "Database connection failedsss.";
	exit;
}

$sql ='SELECT `item_id` FROM `product_item_detail` WHERE `title`=:title AND `size`=:size';
$statement = $pdo->prepare($sql);
$statement->bindValue(':title',$_POST['title']);
$statement->bindValue(':size',$_POST["size"]);
echo $_POST['title'];
echo $_POST['size'];

$statement->execute();
$data_filtered = $statement->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($data_filtered,JSON_NUMERIC_CHECK);

?>

