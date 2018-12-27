<?php 
//CHANGE CONTENT TYPE otherwise the "echo json_encode" will return plain text
header('Content-Type: application/json;charset=utf8'); 

include('../DB.php');
// DB object
try{
	$pdo = new PDO("mysql:host={$in[ht]};dbname={$in[dn]};port={$in[pt]};charset={$in[ct]}","{$in[un]}","{$in[pd]}");
}catch(PDOException $e){
	echo "Database connection failed.";
	exit;
}
// echo $_POST['name'];
// echo $_POST['password'];
// command SQL 
$sql ='INSERT INTO `member`(`name`, `password`) VALUES (:name,:password)';
$statement = $pdo->prepare($sql);
$statement->bindValue(':name',$_POST['name']);
$statement->bindValue(':password',$_POST['password']);
$result = $statement->execute();

if($result){
	
	echo json_encode(['result' => '註冊成功']);
}else{
	echo json_encode(['result' => '註冊失敗']);
}


?>
