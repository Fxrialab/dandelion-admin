<!DOCTYPE html>
<html ng-app="app" >
    <head>
        <meta charset="UTF-8">
        <title>Dandelion</title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- font Awesome -->
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <!-- Theme style -->
        <link href="css/admin.css" rel="stylesheet" type="text/css" />

    </head>
    <body  style="padding-top:180px">
		
    <div class="container" ng-controller="FormCtrl" style="width:450px; margin: 0 auto">

      <form name="form" style="margin: 0 auto" autocomplete="off" novalidate shake-that submitted="submitted" submit="submit(user)">
        <div class="panel panel-default box-shadow">
          <div class="panel-heading">
            <h3 class="panel-title">
              Login
            </h3>
          </div>
          <div class="panel-body">
            <div class="form-group" ng-class="{'has-error': form.username.$invalid && submitted}">
              <label for="username" class="control-label">Username</label>
              <input
                type="username"
                class="form-control"
                id="username"
                name="username"
				value = "huynhtuvinh87@gmail.com"
                placeholder="Username"
                ng-model="user.username"
                ng-model-options="{updateOn: 'blur'}"
                required>
            </div>
            <div class="form-group" ng-class="{'has-error': form.password.$invalid && submitted}">
              <label for="password" class="control-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
				value="123456"
                placeholder="Password"
                ng-model="user.password"
                required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </div>
        </div>
      </form>

      <div class="alert alert-success message" ng-show="showMessage">Well done!</div>

    </div>

        <script src="bower_components/angular/angular.js"></script>
        <script src="bower_components/angular-resource/angular-resource.js"></script>
        <script src="bower_components/angular-cookies/angular-cookies.js"></script>
        <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
        <script src="bower_components/angular-route/angular-route.js"></script>
		 <script src="app/angular-animate.js"></script>
		<script src="app/login.js"></script>
        <!-- jQuery 2.0.2 -->
    
   

    </body>
</html>