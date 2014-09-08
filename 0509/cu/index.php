<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title>Dandelion - Admin</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- build:css styles/vendor.css -->
        <!-- bower:css -->
        <!--<link data-require="bootstrap-css@*" data-semver="2.3.2" rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" />-->
        <link rel="stylesheet" href="app/bower_components/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="app/bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="app/bower_components/jquery-ui/themes/smoothness/jquery-ui.css">
        <link rel="stylesheet" href="app/bower_components/ngDialog/css/ngDialog.css">
        <link rel="stylesheet" href="app/bower_components/ngDialog/css/ngDialog-theme-default.css">
        <link rel="stylesheet" href="app/bower_components/ngDialog/css/ngDialog-theme-plain.css">
        <link rel="stylesheet" href="app/bower_components/ng-table/ng-table.css">
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css({.tmp,app}) styles/main.css -->
        <link rel="stylesheet" href="app/styles/admin.css">
        <link rel="stylesheet" href="app/styles/icons.min.css">
        <link rel="stylesheet" href="app/styles/font-awesome.min.css">
        <link rel="stylesheet" href="app/styles/font-awesome.css">
        <link rel="stylesheet" href="app/styles/icons.min.css">
        <link rel="stylesheet" href="app/styles/tables.css">
        <link rel="stylesheet" href="app/styles/jquery.fileupload.css">
        <!-- endbuild -->
    </head>
    <body ng-app="dandelionAdminApp" class="skin-blue">

        <div ng-view="">
            
        </div>
        <!-- Add your site or application content here -->
        <!--<div class="container" ng-view=""></div>-->

        <!--[if lt IE 9]>
        <script src="bower_components/es5-shim/es5-shim.js"></script>
        <script src="bower_components/json3/lib/json3.min.js"></script>
        <![endif]-->

        <!-- build:js scripts/vendor.js -->
        <!-- bower:js -->
        <script src="app/bower_components/jquery/dist/jquery.js"></script>
        <script src="app/bower_components/jquery-ui/ui/minified/jquery-ui.min.js"></script>
        <script src="app/bower_components/angular/angular.js"></script>
        <script src="app/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="app/bower_components/angular-resource/angular-resource.js"></script>
        <script src="app/bower_components/angular-cookies/angular-cookies.js"></script>
        <script src="app/bower_components/angular-sanitize/angular-sanitize.js"></script>
        <script src="app/bower_components/angular-route/angular-route.js"></script>
        <script src="app/bower_components/ngDialog/js/ngDialog.js"></script>
        <script src="app/bower_components/ng-table/ng-table.js"></script>
        <!-- endbower -->
        <!-- endbuild -->

        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="app/scripts/libs/init.js"></script>
        <script src="app/scripts/app.js"></script>
        <script src="app/scripts/libs/upload/jquery.fileupload.js"></script>
        <script src="app/scripts/libs/upload/jquery.fileupload-angular.js"></script>
        <script src="app/scripts/libs/upload/jquery.ui.widget.js"></script>
        <script src="app/scripts/controllers/loginCtrl.js"></script>
        <script src="app/scripts/controllers/mainCtrl.js"></script>
        <script src="app/scripts/controllers/userCtrl.js"></script>
        <script src="app/scripts/controllers/postCtrl.js"></script>
        <script src="app/scripts/controllers/commentCtrl.js"></script>
        <script src="app/scripts/controllers/managerCtrl.js"></script>
        <script src="app/scripts/controllers/photoCtrl.js"></script>
        <script src="app/scripts/controllers/searchCtrl.js"></script>
        <script src="app/scripts/controllers/themeCtrl.js"></script>
        <script src="app/scripts/services/userService.js"></script>
        <script src="app/scripts/services/managerService.js"></script>
        <script src="app/scripts/services/searchService.js"></script>
        <script src="app/scripts/services/mainService.js"></script>
        <script src="app/scripts/services/themeService.js"></script>
        <script src="app/scripts/directives/mainDirective.js"></script>
    </body>
</html>
