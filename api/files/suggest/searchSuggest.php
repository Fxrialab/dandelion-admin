<?php
//Get our database abstraction file
require('database.php');

if (isset($_GET['search']) && $_GET['search'] != '') {
	//Add slashes to any quotes to avoid SQL problems.
	$search = $_GET['search'];
	$suggest_query = db_query("SELECT distinct(budgetcode) as suggest FROM budgetallocation WHERE budgetcode like('" .$search . "%') ORDER BY budgetcode");
	while($suggest = db_fetch_array($suggest_query)) {
		echo $suggest['suggest'] . "\n";
	}
}
?>