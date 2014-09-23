<!DOCTYPE html>
<html lang="en" ng-app="dandelionAdminApp">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Adminstrator</title>

        <!-- Bootstrap Core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom CSS -->
        <link href="css/admin.css" rel="stylesheet">
        <link href="css/upload.css" rel="stylesheet">
        <!-- Morris Charts CSS -->
        <link href="css/plugins/morris.css" rel="stylesheet">

        <!-- Custom Fonts -->
        <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="bower_components/ng-table/ng-table.css">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    </head>

    <body ng-cloak="">

        <div id="{{wrapper}}">

            <!-- Navigation -->
            <div ng-if='authenticated' ng-include src="'partials/nav.html'"></div>
            <div id="page-wrapper" data-ng-view="" ng-class="{ 'bg': authenticated }">

            </div>
            <!-- /#page-wrapper -->

        </div>
        <!--        <div ng-show="login" data-ng-view="">
        
                </div>-->
        <!-- /#wrapper -->
    <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
    <!-- Libs -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/jquery-ui/ui/minified/jquery-ui.min.js"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-route/angular-route.min.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.min.js"></script>
    <script src="bower_components/ng-table/ng-table.js"></script>
    <script src="bower_components/ng-table/ng-table-export.js"></script>
    <script src="js/libs/angular-animate.min.js" ></script>
    <script src="js/libs/toaster.js"></script>
    <script src="js/libs/ui-bootstrap.js"></script>
    <script src="js/libs/angular-dialog.js"></script>

    <script src="js/upload/jquery.fileupload.js"></script>
    <script src="js/upload/jquery.fileupload-angular.js"></script>
    <script src="js/upload/jquery.ui.widget.js"></script>
    <script src="app/app.js"></script>
    <script src="app/services/data.js"></script>
    <script src="app/directives/directives.js"></script>
    <script src="app/controllers/auth.js"></script>
    <script src="app/controllers/users.js"></script>
    <script src="app/controllers/posts.js"></script>
    <script src="app/controllers/themes.js"></script>
    <script src="app/controllers/plugin.js"></script>
    <script src="app/controllers/dashboard.js"></script>
    <script src="app/controllers/group.js"></script>
    <script src="app/controllers/photo.js"></script>
    <script src="app/controllers/upload.js"></script>
    <script src="js/libs/jquery-1.11.0.js"></script>
    <script src="js/libs/bootstrap.min.js"></script>

</body>

</html>

