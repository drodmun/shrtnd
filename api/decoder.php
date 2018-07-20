<?php 
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET');
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
			$uniqueKey = mysql_real_escape_string($_REQUEST["key"]);
  
			$sql = 'SELECT * FROM SHRTND_URL WHERE UNIQUE_KEY = \''.$uniqueKey.'\'';
    
      $result = mysql_query($sql, $con);
      while($row = mysql_fetch_array($result)) {
				$urlLink = $row['URL'];

				if($ret = parse_url($row['URL']) ) {
					if(!isset($ret["scheme"]) ) {
						$urlLink = "http://{$urlLink}";
					}
				}
      }

			mysql_close($con);

			echo "<script> location.href='".$urlLink."'; </script>";
        	exit;
		} else {
			array_push($return['errors'],'The specified database could not be selected, please check the information you have entered!');
		}
	} else {
		array_push($return['errors'],'Connection not possible, please check data! MYSQL-error: '.mysql_error());
	}
?>