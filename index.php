<!DOCTYPE html>
<html lang="en" ng-app="myApp">

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

            <nav ng-if='authenticated'  class="navbar navbar-inverse navbar-fixed-top" role="navigation" >
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">Adminstrator</a>
                </div>
                <!-- Top Menu Items -->
                <ul class="nav navbar-right top-nav">

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> {{name}} <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#!/profile/{{token}}"><i class="fa fa-fw fa-user"></i> Profile</a>
                            </li>
                            <li>
                                <a href="#!/setting/{{token}}"><i class="fa fa-fw fa-gear"></i> Settings</a>
                            </li>
                            <li class="divider"></li>
                            <li ng-controller="authCtrl">
                                <a href="javascript:void(0)" ng-click="logout()"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav side-nav">
                        <li>
                            <a href="#!/dashboard/{{token}}"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="#!/users/{{token}}"><i class="fa fa-fw fa-bar-chart-o"></i> Users</a>
                        </li>
                        <li>
                            <a href="#!/themes/{{token}}"><i class="fa fa-fw fa-table"></i> Themes</a>
                        </li>
                        <li>
                            <a href="#!/posts/{{token}}"><i class="fa fa-fw fa-table"></i> Posts</a>
                        </li>
                        <li>
                            <a href="#!/comments/{{token}}"><i class="fa fa-fw fa-table"></i> Comment</a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
            <div id="page-wrapper" data-ng-view="">

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
    <script src="js/angular-animate.min.js" ></script>
    <script src="js/toaster.js"></script>
    <script src="js/ui-bootstrap.js"></script>
    <script src="js/angular-dialog.js"></script>
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
    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Morris Charts JavaScript -->
<!--    <script src="js/plugins/morris/raphael.min.js"></script>
    <script src="js/plugins/morris/morris.min.js"></script>
    <script src="js/plugins/morris/morris-data.js"></script>-->

</body>

</html>

