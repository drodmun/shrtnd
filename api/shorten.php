<?php 
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST,GET');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
?>

<?php

	# Access data
	$db_server 	 = '';
	$db_user 	 = '';
	$db_passwort = '';
	$db_name 	 = '';

	# Connection establishment
	$con = mysql_connect($db_server, $db_user, $db_passwort);

	if ($con) {
		// echo 'Server connection successful, select database...';

		if(mysql_select_db($db_name)) {
			// echo 'Server connection successful, select database ...';

			$url	= mysql_real_escape_string($_REQUEST['url']); 
			$id		= rand(10000,99999);
			$key 	= base_convert($id, 20, 36);
			$sql 	= "INSERT IGNORE INTO SHRTND_URL VALUES('$id','$url','$key', NOW())";
			
			mysql_query($sql, $con);

			// All going good, retrieve key (in case already existed)    
			$sql = 'SELECT * FROM SHRTND_URL WHERE URL = \''.$url.'\'';
    
			$result = mysql_query($sql, $con);
			while($row = mysql_fetch_array($result)) {
			  	$res = $row['UNIQUE_KEY'];
				break;
			}

			header('Content-type: application/json');
			echo json_encode(["message" => $res]);
		} else {
			http_response_code(500);
			die();
			// $return['value'] = 'The specified database could not be selected, please check the information you have entered!');
		}
	} else {
		http_response_code(500);
		die();
		// $return['value'] = 'Connection not possible, please check data! MYSQL-error: '.mysql_error());
	}
?>