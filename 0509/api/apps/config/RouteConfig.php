<?php

/**
 * Created by fxrialab team
 * Author: Uchiha
 * Date: 7/30/13 - 10:02 AM
 * Project: UserWired Network - Version: beta
 */
class RouteConfig
{

    //Notice: Put controller contain function is first
    public $default = array(
        'register_POST' => "AdminController",
        'login_POST' => "AdminController",
        'logout_POST' => "AdminController",
        'delete_POST' => "AdminController",
        'checkUser_POST' => "AdminController",
        'checkEmail_POST' => "AdminController",
        'profile_POST' => "AdminController",
        'update_POST' => "AdminController",
        'users_POST' => "UserController",
        'user_GET' => "UserController",
        'status_POST' => "UserController",
        'admin_POST' => "AdminController",
        'posts_POST' => "PostController",
        'photos_POST' => "PhotoController",
        'comments_POST' => "CommentController",
        'forgotPassword_POST' => "AdminController",
        'advancedSearch_POST' => "SearchController",
        'search_POST' => "SearchController",
        'main_POST' => "HomeController",
        'upload_POST' => "ThemeController",
        'deleteFile_GET' => "ThemeController",
        'theme_POST' => "ThemeController",
        'install_POST' => "ThemeController",
        'detailTheme_POST' => "ThemeController",
        'description_POST' => "ThemeController"
    );

}
